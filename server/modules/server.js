var http = require('http');
var router = require('./router.js');
var handle = require('./handle.js');

var port;
var address;

var start = function(addressPassed, portPassed) {
	
	address = addressPassed || '127.0.0.1';
	port = portPassed || 8080;

	http.createServer(function (request, response) {
			
		router.route(request, response, handle);
		
	}).listen(port, address);
	
	console.log('Server started, and listening at ' + address + ':' + port);
	
};

exports.start = start;
