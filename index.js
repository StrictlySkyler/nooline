var start = require('./server/modules/server.js').start

	, arg1
	, addressPassed
	, portPassed;

if (process.argv.length > 2) {
	
	arg1 = process.argv[2].split(':');
	addressPassed = arg1[0];
	portPassed = arg1[1];
	
}

start(addressPassed, portPassed);