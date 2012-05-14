// This is the module grabs a file and updates it, replacing the content in it
// currently, with the new content received from the client.

'use strict';

var fs = require('fs'),
	debug = require('./logger.js').debug,
	errlog = require('./logger.js').error,

update = function(postData, request, response) {
	
	// Parse out the object that we've received from the client.
	var content = JSON.parse(postData),
	// Grab the file we're going to be modifying, based upon which site the client
	// is viewing.
		file = './client/' +
		request.headers.host +
		'/content/' +
		content.type +
		'/' +
		content.name +
		'.json';
	
	// Write the file out as JSON.
	fs.writeFile(file, JSON.stringify(content, null, '\t'), function(error) {
		if (error) {
			
			errlog(__filename, error);
			
		} else {
			
			debug(__filename, 'Content ' + file + ' has been updated.');
			
			response.writeHead(201, {
				"Content-Type" : "text/plain"
			});
			response.write('Content has been saved successfully.');
			response.end();
			
		}
	});
	
};

exports.update = update;