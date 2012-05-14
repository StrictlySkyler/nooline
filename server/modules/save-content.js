// This module is responsible for saving new content, incrementally increasing
// the file name based upon what exists in the directory already.

'use strict';

var fs = require('fs'),
	debug = require('./logger.js').debug,
	errlog = require('./logger.js').error,

save = function(postData, request, response) {
	
	// Parse out the content we're receiving from the client into an object.
	var content = JSON.parse(postData),
	// Count starts at 1, for the first piece of content.
	count = 1,
	// The initial file we're going to try to modify.
	file = './client/' +
		request.headers.host +
		'/content/' +
		content.type +
		'/' +
		content.type +
		'-' +
		count +
		'.json',
	
	// Here we check to see what files have been saved, and save the next one
	// incrementally.
	fileCheck = function() {
		
		// First we try to read to see if our filename already exists.
		fs.readFile(file, function(error) {
			
			// If we get an error, it means it likely doesn't, and we're probably safe
			// to write out to it.
			if (error) {
				
				fs.writeFile(file, JSON.stringify(content, null, '\t'),
					function(error) {
					if (error) {
						
						// If it does already exist, and we can neither read nor write to
						// it, log the error.
						errlog(__filename, error);
						
					} else {
						
						// Otherwise we save away.
						debug(__filename, 'Content saved as ' + file + '.');
						
						response.writeHead(201, {
							"Content-Type" : "text/plain"
						});
						response.write('Content has been saved successfully.');
						response.end();
						
					}
				});
			} else {
				
				// If our file does already exist, and we can read from it, increment
				// the count and try again.
				count++;
				file = './client/' +
					request.headers.host +
					'/content/' +
					content.type +
					'/' +
					content.type +
					'-' +
					count +
					'.json';
					
				fileCheck();
				
			}
		});
	};
	
	// In initial run.
	fileCheck();
	
};

exports.save = save;