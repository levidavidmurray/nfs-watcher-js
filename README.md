# NFS Watcher
Watches all files in a specified local directory, and forces a filesystem update on the remote machine whenever the file is changed locally. Useful for things like hot reloading with webpack when the source files are not local to where they're being used.

### Usage
```shell
# Install dependencies
git clone https://github.com/levidavidmurray/nfs-watcher
cd nfs-watcher
yarn install
```

```shell
# Configuration
vi watcher.config.js

# See below
```

**localWatchDirs**: Directories being watched for changes

**localAppRoot**: Local app root differentiating between local and remote filesystems

**remoteAppRoot**: Remote app root differentiating between remote and local filesystems

##### watcher.config.js
```config
module.exports = {
	localWatchDirs: "/path/to/watch/directory/", // Array for multiple directories
	localAppRoot: "/local/path/to/app/root",
	remoteAppRoot: "/remote/path/to/app/root",

	devServer: {
		host: 'domain.example.com',
		port: 22,
		username: 'user',
		agent: '/path/to/ssh/agent'
		// or specify private key
		privateKey: '/home/levi/.ssh/id_rsa'
	}
}
```
See [node-ssh](https://www.npmjs.com/package/node-ssh) for more SSH configuration options

##### Example
```config
module.exports = {
	localWatchDirs: ["/home/levi/myApp/src", "home/levi/myApp/lib"],
	localAppRoot: "/home/levi/myApp",
	remoteAppRoot: "/mnt/myApp",

	devServer: {
		host: 'levi.myapp.ca',
		port: 22,
		username: 'myapp',
		agent: '/run/user/1000/keyring/.ssh'
	}
}
```
