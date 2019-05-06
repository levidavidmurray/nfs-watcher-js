# NFS Watcher
### Watches all files in a specified local directory, and forces a filesystem update on the remote machine whenever the file is changed locally. Useful for things like hot reloading with webpack when the source files are not local to where they're being used.

#### watcher.config.js
```config
module.exports = {
	localWatchDir: "/path/to/watch/directory/", // Array for multiple directories
	localAppRoot: "/local/path/to/app/root",
	remoteAppRoot: "/remote/path/to/app/root",

	devServer: {
		host: 'domain.example.com',
		port: 22,
		username: 'user',
		agent: '/path/to/ssh/agent'
		// or specify private key
		privateKey: '/home/levi/.ssh/id_rsa'
		// See [node-ssh](https://www.npmjs.com/package/node-ssh) for more config options
	}
}
```

#### Example
```config
module.exports = {
	localWatchDir: ["/home/levi/myApp/src", "home/levi/myApp/lib"],
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
