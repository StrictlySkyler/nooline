// This file, index.js, is the entry point to the app, catching the flags passed
// to it at the command line when initialized.

// The server.js file does the bulk of the rest of the work for this CMS.

'use strict';

var start = require('./server/modules/server.js').start
	, Browser = require('zombie')
	, fs = require('fs')
	, debug = require('./server/modules/logger.js').debug
	, errlog = require('./server/modules/logger.js').error

	, sites
	, i
	, portPassed	// nooline defaults to port 8080 if no port is passed.
	, browser = new Browser({
		debug : true,
		runScripts : true,
		waitFor : 2000
	});

// Catch the CLI flags.
if (process.argv.length > 2) {
	
	portPassed = process.argv[2];
	
}

// Start the server.
start(portPassed);

fs.readdir('./client/sites', function(error, data) {
	if (error) {
		errlog(__filename, error);
	} else {
		
		sites = data;
		
		for (i = 0, sites.length; i < sites.length; i++) {
			
			if (sites[i] !== 'localhost') {
				var sitename = sites[i];
				
				browser.visit('http://' +
											sites[i], function(e, browser) {
					
					fs.writeFile('./client/sites/' +
						browser.window.location.host +
						'/snapshots/' +
						'index.html', browser.html(), function(error) {
						
						if (error) {
							
							errlog(__filename, error);
							
						} else {
							
							debug(__filename, 'HTML snapshot of ' +
										browser.window.location.host +
										' taken!');
							
						}
					});
				});
			}
		}
		
	}
});