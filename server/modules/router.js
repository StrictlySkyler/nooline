var url = require('url');

var files;
var requestPath;
var extension;
var guess;
var redirect = false;

var route = function(request, response, handle) {

	requestPath = url.parse(request.url).pathname;
	
	extension = /\.\w+/.test(requestPath);
		
	console.log(requestPath +
							' has been requested.');
			
	if (typeof handle[requestPath] === 'function') {
				
		handle[requestPath](request, response, requestPath);
				
	} else if (extension) {
				
		handle["request"](request, response, requestPath);
		
	} else if (!extension) {
				
		console.log('No extension provided in ' + requestPath + ', requesting ' +
								requestPath +
								'.html instead.');
		requestPath += '.html';
		handle["request"](request, response, requestPath, redirect);
		
	} else {
		
		handle["404"](response, requestPath);
		
	}

}

exports.route = route;