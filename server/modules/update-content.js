// This is the module grabs a file and updates it, replacing the content in it currently, with the new content received from the client.

/*jslint node: true, white: true, plusplus: true, maxerr: 50, indent: 2 */
'use strict';

var fs = require('fs'),

update = function(postData, request, response) {
	
	// Parse out the object that we've received from the client.
	var content = JSON.parse(postData),
	// Grab the file we're going to be modifying, based upon which site the client
	// is viewing.
		file = './client/content/' +
		request.headers.host +
		'/' +
		content.type +
		'/' +
		content.name +
		'.json';
	
	// Write the file out as JSON.
	fs.writeFile(file, JSON.stringify(content, null, '\t'), function(error) {
		if (error) {
			
			console.error(error);
			
		} else {
			
			console.log('Content ' + file + ' has been updated.');
			
			response.writeHead(201, {
				"Content-Type" : "text/plain"
			});
			response.write('Content has been saved successfully.');
			response.end();
			
		}
	});
	
};

exports.update = update;