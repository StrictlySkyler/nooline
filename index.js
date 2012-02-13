// This file, index.js, is the entry point to the app, catching the flags passed
// to it at the command line when initialized.

// The server.js file does the bulk of the rest of the work for this CMS.

/*jslint node: true, white: true, maxerr: 50, indent: 2 */
'use strict';

var start = require('./server/modules/server.js').start

	, portPassed;	// nooline defaults to port 8080 if no port is passed.

// Catch the CLI flags.
if (process.argv.length > 2) {
	
	portPassed = process.argv[2];
	
}

// Start the server.
start(portPassed);