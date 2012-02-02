var http = require('http');
var router = require('./router.js');
var handle = require('./handle.js');

var address;

var start = function(portPassed) {
	
	port = portPassed || 8080;

	http.createServer(function (request, response) {
		
		router.route(request, response, handle);
		
	}).listen(port);
	
	console.log('Server started, and listening at port ' + port);
	
};

exports.start = start;
