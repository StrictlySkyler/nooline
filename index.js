var start = require('./server/modules/server.js').start

	, portPassed;

if (process.argv.length > 2) {
	
	portPassed = process.argv[2]
	
}

start(portPassed);