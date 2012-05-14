// This module is responsible for loading the content requested by the client,
// batching it up, and sending it along as JSON.

'use strict';

var fs = require('fs'),
	debug = require('./logger.js').debug,
	errlog = require('./logger.js').error,

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
	unpublished = {},
	readFile,
	readDir,
	contentFloor,
	cache;
	
	unpublished.names = [];
	unpublished.types = [];
	
	// Parse out what the client is looking for, based on the content passed
	// along.
	try {
		postData = JSON.parse(postData);
	} catch (e) {
		errlog(__flename, 'No data posted; client script not being executed.' +
			'  Maybe a search bot?');
	}
	
	// Gather up all the content requested, and push it to the content array of
	// the object passed in. Not called until the async read operation is
	// complete.
	aggregate = function(obj, whatKind, total) {
		
		debug(__filename, 'Grabbing ' +
			obj.howMany +
			' most recent \"' +
			whatKind +
			'\" content items...');
		
		var readFile = function(target) {
			
			// Read out the file, if we can.
			fs.readFile('./client/sites/' +
				request.headers.host +
				'/content/' +
				whatKind +
				'/' +
				target + '.json', 'utf8', function(error, data) {
				if (error) {
					
					errlog(__filename, error);
					
				} else {
					
					if (JSON.parse(data).published) {
						debug(__filename, '...' +
							target +
							'.json grabbed...');
						
						// Push the contents of the file to the content array in our object.
						obj.content.push(data);
					} else {
						debug(__filename, '...' +
							target +
							'.json not published, SKIPPING...');
						
						cache = JSON.parse(data);
						unpublished.names.push(cache.name);
						unpublished.types.push(cache.type);
						
					}
					
					checkComplete();
					
				}
			});
		},
		
		checkComplete = function() {
			
			// If the length of our content array matches the number of content
			// items requested, we increment the number of content items we've
			// completed.
			if (obj.content.length === obj.howMany) {
				
				contentTypesComplete++;
				
				debug(__filename, '...All \"' +
					whatKind +
					'\" content items have been grabbed.');
				
			}
			
			if ((obj.nextInLine) && (unpublished.types.length > 0)) {
				
				contentFloor = parseInt(obj.nextInLine.match(/\d+/)[0], 10) - 1;
				
				for (i = 0, len = unpublished.names.length; i < len; i++) {
					readFile(obj.nextInLine);
					
				}
				
				if (contentFloor > 0) {
					obj.nextInLine = obj.nextInLine.replace(/\d+/, contentFloor);
				} else {
					delete obj.nextInLine;
				}
				
			}
			
			// If the number of content types we've completed matches the number
			// requested, we've grabbed all the content, and can send it back to
			// the client.
			if (contentTypesComplete === contentTypesRequested) {
				unpublished.types = [];
				
				debug(__filename, 'All ' +
					contentTypesComplete +
					' content types have been grabbed!');
				
				response.writeHead(200, {
					'Content-Type': 'text/plain'
				});
				response.write(JSON.stringify(postData));
				response.end();
				
				debug(__filename, 'Data sent back to client.');
			}
		}
		
		// For however many content items are requested, grab the appropriate files.
		for (i = 0, len = obj.howMany; i < len; i++) {
			
			// Files are saved incrementally, meaning the highest number should be the
			// most recent. We decrement from there, based on the toal number
			// reported.
			file = whatKind + '-' + (total - i);
			
			debug(__filename, '...Grabbing content item: ' + file + '...');
			
			readFile(file);
			
		}
	};
	
	readDir = function() {
		// Go looking for the content type being requested for this domain,
		// determine how much content exists, and if we can serve it.
		fs.readdir('./client/sites/' +
			request.headers.host +
			'/content/' +
			i +
			'/', function(error, files) {
			if (error) {
				
				errlog(__filename, error);

			} else {
				// Total number of content pieces of this content type.
				total = files.length;
				
				// Because this is an async operation, we need to be able to determine
				// what kind of content we're dealing with after the loop has already
				// finished. Since the files are named based upon their content type,
				// we can set this when the operation finishes by testing against this
				// with RegExp.
				whatKind = files[0].match(/\w+/)[0];
				
				debug(__filename, '...' + total + ' \"' +
					whatKind +
					'\" content items total.');
				
				// If we have less content than they've requested, just set our target
				// number to what we have, and load that instead.
				if (total < postData[whatKind].howMany) {
					postData[whatKind].howMany = total;
				}
				
				if ((total - postData[whatKind].howMany) !== 0) {
					postData[whatKind].nextInLine = whatKind + '-' +
						(total - postData[whatKind].howMany);
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
			
			debug(__filename, postData[i].howMany +
				' \"' +
				i +
				'\" content items requested...');
			
			// Set an array for the content objects we'll grab from the JSON files.
			postData[i].content = [];
			
			readDir();
		}
	}
	
	debug(
		__filename,
		contentTypesRequested +
		' types of content have been requested.');
	
};

exports.load = load;