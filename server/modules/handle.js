// This file does bulk of figuring out what to do with specific requests.
// Eventually the plan is to make it extensible by moving all but a select few
// utility handlers to a folder containing each specific handler, and including
// those dynamically like plugins.

// Right now we have the ability to save new content as files, read existing
// content, update existing content, and login. That gives us CRU out of the
// CRUD model, excepting that we also lack the ability to re-classify content
// automatically. That, along with deletion, is forthcoming.

/*jslint node: true, white: true, maxerr: 50, indent: 2 */
'use strict';

var fs = require('fs'),
	save = require('./save-content.js').save,
	load = require('./load-content.js').load,
	update = require('./update-content.js').update,
	auth = require('./authenticate.js').auth,
	path = require('path'),
	i,
	
	// The "handle" object lets us dynamically define and export each handler we
	// have, and match them specifically to custom strings, like pathnames from an
	// http request.
	handle = {},
	
	// "defaultPath" is the place to which redirects are sent, if they are
	// enabled.
	defaultPath = '/', // This should eventually be implemented as a CLI flag.
	postData = '';

// A request with no path specified attempts to load the template file
// associated with the hostname requested by the client.
handle["/"] = function(request, response) {
	
	// Reset postData if it was modified.
	postData = '';
	
	console.log('Handling default request for ' + request.headers.host + '.');
	
	// If there was a POST, catch the data chunks we receive and put 'em together.
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	// When the request has finished, check to see if we've received anything. If
	// so, save it.
	request.addListener('end', function() {
		
		if (postData !== '') {
			
			console.log('POST received.  Attempting to save data.');
			
			save(postData, request);
			
		}
		
		// Grab the template file requested, and serve it up, if we can. Otherwise
		// throw a 404.
		console.log('Serving ./client/templates/' + request.headers.host + '.html.');
				
		fs.readFile('./client/templates/' +
			request.headers.host +
			'.html', 'utf8', function(error, content) {
			
			if (error) {
				
				console.error(error);
				
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

// Some browsers make an extra request for the favicon located in the docroot.
// This routes them to where ours lives, or throws a 404 if it can't find it.
//
// This implementation is deprecated, and needs to be either updated to look for
// the host.name.ico file, or removed entirely to rely solely upon the templates
// including the favicon in a link tag.
handle["/favicon.ico"] = function(response) {
	
	fs.readFile('./client/images/favicon.ico', 'base64', function(error, data) {
		if (error) {
			
			console.error(error);
			
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

// If redirection is enabled and we can't find what was requested, send them
// permanently back to the default path.
handle.redirect = function(response, requestPath) {
	
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

// Send along a nice 404 for anything we can't find, usually if redirection
// isn't enabled.
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

// Dynamic request handler; grabs any post data and saves it, like above, and
// serves up any files requested.
// Eventually this should be split off into subdomains, like how the default
// path is handled; right now all of the non-template assets live in the same
// directories, and aren't split up based on domain.
handle.request = function(request, response, requestPath, redirect) {
	
	postData = '';
	
	console.log('Handling request for ' + requestPath + '.');
	
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	request.addListener('end', function() {
		
		if (postData !== '') {
			
			console.log('POST received.  Attempting to save data.');
			
			save(postData, request, requestPath);
			
		}
		
		console.log('Serving ' + requestPath + '.');
				
		fs.readFile('.' +
								requestPath, function(error, content) {
			if (error && redirect) {
				
				handle.redirect(response, requestPath);
				
			} else if (error) {
				
				console.error(error);
				
				response.writeHead(404, {
					"Content-Type" : "text/plain"
				});
				response.write('We couldn\'t find that resource on our server.');
				response.end();
			
			} else {
				
				// Serve up some MIME types for what we're serving. This needs to be
				// split into its own config file/module.
				var extension = path.extname(requestPath),
					contentType = 'text/html';
				
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

// If we have a login request, call the authentication module.
handle["/login"] = function(request, response) {
	
	auth(request, response);
	
};

// If the client is posting content, like adding a blog post, grab it all and
// save it.
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
			
			save(postData, request, response);
			
		}
		
	});
		
};

// Just like saving content above, bit we're updating it.
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
			
			update(postData, request, response);
			
		}
		
	});
		
};

// Loading the content usually happens on first page load, but this could be
// called at any time, if desired.
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
		
	});
	
};

// Export all the methods in the handler.
for (i in handle) {
	if (handle.hasOwnProperty(i)) {
		exports[i] = handle[i];
	}
}