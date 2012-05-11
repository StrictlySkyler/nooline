// In order to know what to serve appropriately, the request needs to be parsed
// to determine what is being asked. This module is responsible for that.

'use strict';

var url = require('url'),
	debug = require('./logger.js').debug,
	errlog = require('./logger.js').error,
	requestPath,
	extension,
	guess,
	redirect = true, // This should eventually be implemented as a CLI flag.
	subdomains = true, // Also should eventually be implemented as a CLI flag.
	newdomain,

route = function(request, response, handle) {
	
	// Parse out the path being requested.
	requestPath = url.parse(request.url).pathname;
	
	// Subdomains impl – buggy and needs to be refactored.
	//	try {
	//		newdomain = request.headers.host.split('.');
	//	} catch (e) {
	//		errlog(__filename, e);
	//	}
	//	
	//	if (!subdomains && newdomain.length > 2) {
	//
	//		newdomain.shift();
	//		
	//		response.writeHead(301, {
	//			"Location" : 'http://' + newdomain.join('.')
	//		});
	//		response.end();
	//	}
	
	// Test to see if the client has supplied a specific extention.
	extension = /\.\w+/.test(requestPath);
	
	debug(__filename, requestPath +
		' has been requested.');
	
	if ((/Mozilla/.test(request.headers['user-agent'])) ||
      (/Opera/.test(request.headers['user-agent'])) ||
      (/Webkit/.test(request.headers['user-agent'])) ||
      (/MSIE/.test(request.headers['user-agent']))) {
		
	
		// If the request has a behavior defined in the handler, execute it, and
		// pass along the request and response to maintain async.
		if (typeof handle[requestPath] === 'function') {
					
			handle[requestPath](request, response, requestPath);
		
		// If an extension was specified, go handle the request for that file.
		} else if (extension) {
					
			handle.request(request, response, requestPath);
			
		// If no extension was specified, and no behavior was defined, redirect and
		// try to load a default .html file instead.
		} else if (!extension) {
					
			debug(__filename, 'No extension provided in ' +
				requestPath +
				', requesting ' +
				requestPath +
				'.html instead.');
			requestPath += '.html';
			handle.request(request, response, requestPath, redirect);
			
		// Failing all that, handle it as a 404 error.
		} else {
			
			handle["404"](response, requestPath);
			
		}
		
	} else {
		
		handle["/index.html"](request, response);
		
	}

};

exports.route = route;