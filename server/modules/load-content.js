// This module is responsible for loading the content requested by the client,
// batching it up, and sending it along as JSON.

/*jslint node: true, white: true, plusplus: true, maxerr: 50, indent: 2 */
'use strict';

var fs = require('fs'),

load = function(postData, request, response) {
	
	// We'll need some counters for this, along with some tracking vars.
	var i,
	len,
	whatKind,
	file,
	total,
	contentTypesRequested = 0,
	contentTypesComplete = 0,
	aggregate = {},
	readFile,
	readDir;
	
	// Parse out what the client is looking for, based on the content passed
	// along.
	postData = JSON.parse(postData);
	
	// Gather up all the content requested, and push it to the content array of
	// the object passed in. Not called until the async read operation is
	// complete.
	aggregate = function(obj, whatKind, total) {
		console.log('Grabbing ' +
			obj.howMany +
			' most recent \"' +
			whatKind +
			'\" content items...');
		
		readFile = function() {
			// Read out the file, if we can.
			fs.readFile('./client/content/' +
				request.headers.host +
				'/' +
				whatKind +
				'/' +
				file, 'utf8', function(error, data) {
				if (error) {
					
					console.error(error);
					
				} else {
					
					console.log('...' + whatKind + '-' +
						(total - obj.content.length) +
						'.json grabbed...');
					
					// Push the contents of the file to the content array in our object.
					obj.content.push(data);
					
					// If the length of our content array matches the number of content
					// items requested, we increment the number of content items we've
					// completed.
					if (obj.content.length === obj.howMany) {
						contentTypesComplete++;
						
						console.log('...All \"' +
							whatKind +
							'\" content items have been grabbed.');
						
						// If the number of content types we've completed matches the number
						// requested, we've grabbed all the content, and can send it back to
						// the client.
						if (contentTypesComplete === contentTypesRequested) {
							console.log('All ' +
								contentTypesComplete +
								' content types have been grabbed!\n' +
								'Sending data back to client.');
							
							response.writeHead(200, {
								'Content-Type': 'text/plain'
							});
							response.write(JSON.stringify(postData));
							response.end();
						}
					}
					
				}
			});
		};
		
		// For however many content items are requested, grab the appropriate files.
		for (i = 0, len = obj.howMany; i < len; i++) {
			
			// Files are saved incrementally, meaning the highest number should be the
			// most recent. We decrement from there, based on the toal number
			// reported.
			file = whatKind + '-' + (total - i) + '.json';
			
			console.log('...Grabbing content item: ' + file + '...');
			
			readFile();
			
		}
	};
	
	readDir = function() {
		// Go looking for the content type being requested for this domain,
		// determine how much content exists, and if we can serve it.
		fs.readdir('./client/content/' +
			request.headers.host +
			'/' +
			i +
			'/', function(error, files) {
			if (error) {
				
				console.error(error);

			} else {
				// Total number of content pieces of this content type.
				total = files.length;
				
				// Because this is an async operation, we need to be able to determine
				// what kind of content we're dealing with after the loop has already
				// finished. Since the files are named based upon their content type,
				// we can set this when the operation finishes by testing against this
				// with RegExp.
				whatKind = files[0].match(/\w+/)[0];
				
				console.log('...' + files.length + ' \"' +
					whatKind +
					'\" content items total.');
				
				// If we have less content than they've requested, just set our target
				// number to what we have, and load that instead.
				if (total < postData[whatKind].howMany) {
					postData[whatKind].howMany = total;
				}
				
				// Put all the content together before sending it back as a batch.
				aggregate(postData[whatKind], whatKind, total);
			}
		});
	};
	
	// For every member of the content object, we need to figure out what we need
	// to grab.
	for (i in postData) {
		if (postData.hasOwnProperty(i)) {
			// Increment based on how many types of content are being requested.
			contentTypesRequested++;
			
			console.log(postData[i].howMany +
				' \"' +
				i +
				'\" content items requested...');
			
			// Set an array for the content objects we'll grab from the JSON files.
			postData[i].content = [];
			
			readDir();
		}
	}
	
	console.log(contentTypesRequested + ' types of content have been requested.');
	
};

exports.load = load;