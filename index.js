const fsSync = require('fs');
const md5 = require('md5');
const chalk = require('chalk');
const nodeSSH = require('node-ssh');
const chokidar = require('chokidar');
const argv = require('minimist')(process.argv.slice(2));

const watcherConfig = require('./watcher.config');
const ignoredMatch = /[\\\/]node_modules[\\\/]/;

const {localAppRoot, remoteAppRoot, localWatchDirs} = watcherConfig;
const ssh = new nodeSSH();

const opts = {
	verbose: {
		short: "v",
		long: "verbose",
		description: "Log every detected file change"
	},

	help: {
		long: "help",
		description: "Show available command line arguments"
	}
};

function notifyRemoteFs(localFilePath) {
	let remoteFilePath = localFilePath.replace(localAppRoot, remoteAppRoot);

	ssh.connect(watcherConfig.devServer)
		.then(() => {
			ssh.execCommand(`touch -a ${remoteFilePath}`).catch(handleError);
		})
		.catch(handleError);
}

function handleError(err) {
	err = chalk.red(err.toString());
	log(`\n${err}\n`);
}

function log(message) {
	console.log(`(${chalk.green('nfs-watcher')}) ${message}`);
}

const fileHashMap = {};

if (argv[opts.help.long]) {
	console.log("\nScript to FS update corresponding remote file when local file changes are detected.")
	console.log("Ensure watcher.config.js values are set\n");
	console.log("Usage:");

	Object.keys(opts).forEach(opt => {
		let optInfo = opts[opt];

		if (optInfo.short) {
			console.log(`\t[--${optInfo.long}, -${optInfo.short}]: ${optInfo.description}`);
		} else {
			console.log(`\t[--${optInfo.long}]: ${optInfo.description}`);
		}
	});

	process.exit();
}

console.log(`Watching for changes: '${chalk.green(localWatchDirs)}'`);
chokidar.watch(localWatchDirs, {persistent: true, ignored: ignoredMatch})
	.on('change', (localFilePath) => {
		let currentHash = md5(fsSync.readFileSync(localFilePath));

		if (localFilePath.match("___jb_tmp___")) {
			console.log(`Skipping: '${chalk.green(localFilePath)}'`);
			return;
		}

		if (!fileHashMap[localFilePath] || fileHashMap[localFilePath] !== currentHash) {
			if (argv[opts.verbose.short] || argv[opts.verbose.long]) {
				log(`${chalk.green('Changed:')} ${localFilePath}`);
			}
			console.log(`Notify change: '${chalk.green(localFilePath)}'`);
			notifyRemoteFs(localFilePath);
			fileHashMap[localFilePath] = currentHash;
		}
	});
