var fs = require('fs');
var save = require('./save-content.js').save;
var load = require('./load-content.js').load;
var update = require('./update-content.js').update;
var auth = require('./authenticate.js').auth;
var path = require('path');

var handle = {};

var defaultPath = '/';
var postData = '';

handle["/"] = function(request, response) {
	
	postData = '';
	
	console.log('Handling default request for ' + request.headers.host + '.');
		
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	request.addListener('end', function() {
		
		if (postData !== '') {
			
			console.log('POST received.  Attempting to save data.');
			
			save(postData, requestPath);
			
		}
		
		console.log('Serving ./client/templates/' + request.headers.host + '.html.');
				
		fs.readFile('./client/templates/' + request.headers.host + '.html', encoding='utf8', function(error, content) {
			
			if (error) {
				
				console.log(error)
				
				response.writeHead(404, {
					"Content-Type" : "text/plain"
				});
				response.write('We couldn\'t find that resource on our server.');
				response.end();
			
			} else {
								
				response.writeHead(200, {
					"Content-Type" : "text/html"
				});
				response.write(content, 'utf-8');
				response.end();
				
			}
		});
		
	});
	
};

handle["/favicon.ico"] = function(request, response) {
	
	fs.readFile('./client/images/favicon.ico', 'base64', function(error, data) {
		if (error) {
			
			console.log(error);
			
			response.writeHead(404);
			response.end();
		
		} else {
			
			console.log('Handling favicon.');
			
			response.writeHead(200, {
				"Content-Type" : "image/x-icon"
			});
			response.write(data);
			response.end();
			
		}
	});
	
};

handle["redirect"] = function(response, requestPath) {
	
	console.log('Couldn\'t handle request for ' +
							requestPath +
							'; redirecting to ' +
							defaultPath +
							'.');
	
	response.writeHead(301, {
		"Location" : defaultPath
	});
	response.end();
	
};

handle["404"] = function(response, requestPath) {
	
	console.log('Couldn\'t handle request for ' +
							requestPath +
							'; resource could not be found.');
	
	response.writeHead(404, {
		"Content-Type" : "text/plain"
	});
	response.write('We couldn\'t find that resource on our server.');
	response.end();
	
};

handle["request"] = function(request, response, requestPath, redirect) {
	
	postData = '';
	
	console.log('Handling request for ' + requestPath + '.');
	
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	request.addListener('end', function() {
		
		if (postData !== '') {
			
			console.log('POST received.  Attempting to save data.');
			
			save(postData, requestPath);
			
		}
		
		console.log('Serving ' + requestPath + '.');
				
		fs.readFile('.' +
								requestPath, function(error, content) {
			if (error && redirect) {
				
				handle["redirect"](response, requestPath);
				
			} else if (error) {
				
				console.log(error)
				
				response.writeHead(404, {
					"Content-Type" : "text/plain"
				});
				response.write('We couldn\'t find that resource on our server.');
				response.end();
			
			} else {
				
				var extension = path.extname(requestPath);
				var contentType = 'text/html';
				
				switch (extension) {
					case '.js' :
						contentType = 'text/javascript';
						break;
					case '.css' :
						contentType = 'text/css';
						break;
					case '.svg' :
						contentType = 'image/svg+xml';
						break;
					case '.eot' :
						contentType = 'application/vnd.ms-fontobject';
						break;
					case '.woff' :
						contentType = 'application/x-font-woff';
						break;
					case '.ttf' :
						contentType = 'application/octet-stream';
						break;
					case '.png' :
						contentType = 'image/png';
						break;
				}
				
				response.writeHead(200, {
					"Content-Type" : contentType
				});
				response.write(content);
				response.end();
				
			}
		});
		
	});
		
};

handle["/login"] = function(request, response) {
	
	auth(request, response);
	
};

handle["/post-content"] = function(request, response, requestPath) {
	
	postData = '';
	
	console.log('Handling request for ' + requestPath + '.');
	
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	request.addListener('end', function() {
		
		if (postData !== '') {
			
			console.log('POST received.  Attempting to save data.');
			
			save(postData, response);
			
		}
		
	});
		
};

handle["/update-content"] = function(request, response, requestPath) {
	
	postData = '';
	
	console.log('Handling request for ' + requestPath + '.');
	
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	request.addListener('end', function() {
		
		if (postData !== '') {
			
			console.log('POST received.  Attempting to save data.');
			
			update(postData, response);
			
		}
		
	});
		
};

handle["/get-content"] = function(request, response, requestPath) {
	
	postData = '';
	
	console.log('Handling request for ' + requestPath + '.');
	
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	request.addListener('end', function() {
		
		if (postData !== '') {
			
			console.log('POST received.  Attempting to load data.');
			
			load(postData, request, response);
		}
		
	})
	
};

for (i in handle) {
	exports[i] = handle[i];
}