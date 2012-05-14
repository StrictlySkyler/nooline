// This file does bulk of figuring out what to do with specific requests.
// Eventually the plan is to make it extensible by moving all but a select few
// utility handlers to a folder containing each specific handler, and including
// those dynamically like plugins.

// Right now we have the ability to save new content as files, read existing
// content, update existing content, and login. That gives us CRU out of the
// CRUD model, excepting that we also lack the ability to re-classify content
// automatically. That, along with deletion, is forthcoming.

'use strict';

var fs = require('fs'),
	save = require('./save-content.js').save,
	load = require('./load-content.js').load,
	update = require('./update-content.js').update,
	remove = require('./remove-content.js').remove,
	auth = require('./authenticate.js').auth,
	publish = require('./publish-content.js').publish,
	path = require('path'),
	debug = require('./logger.js').debug,
	errlog = require('./logger.js').error,
	addUser = require('./users.js').add,
	removeUser = require('./users.js').remove,
	changePassword = require('./users.js').change,
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
		
	// Grab the template file requested, and serve it up, if we can. Otherwise
	// throw a 404.
	debug(
		__filename,
		'Serving ./client/' +
		request.headers.host +
		'/templates/main.html.');
		
	fs.readFile('./client/sites/'+
		request.headers.host +
		'/templates/main.html', 'utf8', function(error, content) {
		
		if (error) {
			
			errlog(__filename, error);
			
			response.writeHead(404, {
				"Content-Type" : "text/plain"
			});
			response.write('We couldn\'t find that resource on our server.');
			response.end();
		
		} else {
			
			try {
				response.writeHead(200, {
					"Content-Type" : "text/html"
				});
				response.write(content);
				response.end();
			} catch (e) {
				
				debug(__filename, 'No response header, must be a bot!  Sending ' +
					'cached page.');
				fs.readFile('./client/sites/' +
					request.headers.host +
					'/snapshots/index.html', 'utf8', function(error, content) {
					
					if (error) {
						errlog(__filename, error);
					} else {
						
						response.write(content);
						response.end();
						
						debug(__filename, 'Cached page sent.');
					}
					
				})
				
			}
			
		}
	});
		
};

// Some browsers make an extra request for the favicon located in the docroot.
// This routes them to where ours lives, or throws a 404 if it can't find it.
//
// This implementation is deprecated, and needs to be either updated to look for
// the host.name.ico file, or removed entirely to rely solely upon the templates
// including the favicon in a link tag.
handle["/favicon.ico"] = function(request, response) {
	
	fs.readFile('./client/sites/' +
		request.headers.host +
		'/images/favicon.ico', 'base64', function(error, data) {
		if (error) {
			
			errlog(__filename, error);
			
			response.writeHead(404);
			response.end();
		
		} else {
			
			// Catching browsers extra requests for the favicon, even if we can't find
			// the asset they're looking for.
			try {
				debug(__filename, 'Handling favicon.');
				
				response.writeHead(200, {
					"Content-Type" : "image/x-icon"
				});
				response.write(data);
				response.end();
			
			// If we can't, just log out the error, and send a 404.
			} catch(e) {
				
				try {
					response.writeHead(404);
					response.end();
					errlog(__filename, e);
				} catch (e) {
					errlog(__filename, e);
				}
				
			}
			
		}
	});
	
};

handle["/robots.txt"] = function(request, response) {
	
	fs.readFile('./client/sites/' +
		request.headers.host +
		'/seo/' +
		'robots.txt', function(error, content) {
		if (error) {
			
			errlog(__filename, error);
			
		} else {
			
			debug(__filename, 'Sending robots.txt.');
			response.write(content);
			response.end();
			
		}
	});
	
}

handle["/index.html"] = function(request, response) {
	
	fs.readFile('./client/sites/' +
		request.headers.host +
		'/snapshots/index.html', function(error, content) {
		if (error) {
			
			errlog(__filename, error);
		} else {
			
			debug(__filename, 'Sending HTML snapshot.');
			response.write(content);
			response.end();
		}
	});
}

// If redirection is enabled and we can't find what was requested, send them
// permanently back to the default path.
handle.redirect = function(response, requestPath) {
	
	debug(__filename, 'Couldn\'t handle request for ' +
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
	
	debug(__filename, 'Couldn\'t handle request for ' +
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
	
	debug(__filename, 'Serving ' + requestPath + '.');
			
	fs.readFile('.' +
							requestPath, function(error, content) {
		if (error && redirect) {
			
			handle.redirect(response, requestPath);
			
		} else if (error) {
			
			errlog(__filename, error);
			
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
		
};

// If we have a login request, call the authentication module.
handle["/login"] = function(request, response) {
	
	debug(__filename, 'Handling request for user login.');
	
	auth(request, response);
	
};

// If the client is posting content, like adding a blog post, grab it all and
// save it.
handle["/post-content"] = function(request, response, requestPath) {
	
	// Reset postData if it was modified.
	postData = '';
	
	debug(__filename, 'Handling request for ' + requestPath + '.');
	
	request.setEncoding('utf8');
	
	// If there was a POST, catch the data chunks we receive and put 'em
	// together.
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	// When the request has finished, check to see if we've received anything. If
	// so, save it.
	request.addListener('end', function() {
		
		if (postData !== '') {
			
			debug(__filename, 'POST received.  Attempting to save data.');
			
			save(postData, request, response);
			
		}
		
	});
		
};

// Just like saving content above, but we're updating it.
handle["/update-content"] = function(request, response, requestPath) {
	
	postData = '';
	
	debug(__filename, 'Handling request for ' + requestPath + '.');
	
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	request.addListener('end', function() {
		
		if (postData !== '') {
			
			debug(__filename, 'POST received.  Attempting to save data.');
			
			update(postData, request, response);
			
		}
		
	});
		
};

// Loading the content usually happens on first page load, but this could be
// called at any time, if desired.
handle["/get-content"] = function(request, response, requestPath) {
	
	postData = '';
	
	debug(__filename, 'Handling request for ' + requestPath + '.');
	
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	request.addListener('end', function() {
		
		if (postData !== '') {
			
			debug(__filename, 'POST received.  Attempting to load data.');
			
			load(postData, request, response);
		}
		
	});
	
};

handle["/remove-content"] = function(request, response, requestPath) {
	
	postData = '';
	
	debug(__filename, 'Handling request for ' + requestPath + '.');
	
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	request.addListener('end', function() {
		
		if (postData !== '') {
			
			debug(__filename, 'POST received.  Attempting to remove content.');
			
			remove(postData, request, response);
		}
		
	});
};

handle["/publish-content"] = function(request, response, requestPath) {
	
	postData = '';
	
	debug(__filename, 'Handling request for ' + requestPath + '.');
	
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	request.addListener('end', function() {
		
		if (postData !== '') {
			
			debug(__filename, 'POST received.  Attempting to publish content.');
			
			publish(postData, request, response);
		}
		
	});
};

handle["/add-user"] = function(request, response, requestPath) {
	
	postData = '';
	
	debug(__filename, 'Handling request to add a user.');
	
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	request.addListener('end', function() {
		
		if (postData !== '') {
			
			debug(__filename, 'POST received.  Attempting to add a new user.');
			
			addUser(postData, request, response);
		}
		
	});
	
};

handle["/remove-user"] = function(request, response, requestPath) {
	
	postData = '';
	
	debug(__filename, 'Handling request to remove a user.');
	
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	request.addListener('end', function() {
		
		if (postData !== '') {
			
			debug(__filename, 'POST received.  Attempting to remove a user.');
			
			removeUser(postData, request, response);
			
		}
		
	});
};

handle["/change-password"] = function(request, response, requestPath) {
	
	postData = '';
	
	debug(__filename, 'Handling request to change a user\'s password.');
	
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	request.addListener('end', function() {
		
		if (postData !== '') {
			
			debug(__filename, 'POST received.  Attempting to change passwords.');
			
			changePassword(postData, request, response);
			
		}
		
	})
	
};

// Export all the methods in the handler.
for (i in handle) {
	if (handle.hasOwnProperty(i)) {
		exports[i] = handle[i];
	}
}