// The server consists of three major parts:
//		1. The http server itself, built into node.
//		2. The router, which routes requests to the handler or other places
//		3. The handler, which handles whatever the router passes to it

'use strict';

var http = require('http'),
	path = require('path'),
	router = require('./router.js'),
	handle = require('./handle.js'),
	debug = require('./logger.js').debug,
	errlog = require('./logger.js').error,
	port,

// Startup our http server and pass it any custom port we've defined.
start = function(portPassed) {
	
	port = portPassed || process.env.port || 8080;

	http.createServer(function (request, response) {
		
		// Passing along the request and response objects to the router lets us
		// maintain async behavior for each request.
		router.route(request, response, handle);
		
	}).listen(port);
	
	debug(__filename, 'Server started, and listening at port ' + port);
	
};

exports.start = start;