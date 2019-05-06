# NFS Watcher
## Watches all files in a specified local directory, and forces a filesystem update on the remote server whenever the file is changed locally.

### watcher.config.js
```config
	module.exports = {
		localWatchDir: "/path/to/watch/directory/",
		localAppRoot: "/local/path/to/app/root",
		remoteAppRoot: "/remote/path/to/app/root",

		devServer: {
			host: 'domain.example.com',
			port: 22,
			username: 'user',
			privateKey: '/path/to/private/key'
		}
	}
```

### Example
```config
	module.exports = {
		localWatchDir: "/home/levi/myApp/src",
		localAppRoot: "/home/levi/myApp",
		remoteAppRoot: "/mnt/myApp",

		devServer: {
			host: 'levi.myapp.ca',
			port: 22,
			username: 'myapp',
			privateKey: '/home/levi/.ssh/id_rsa'
		}
	}
```
