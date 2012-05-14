
var fs = require('fs'),
	debug = require('./logger.js').debug,
	errlog = require('./logger.js').error,
	unpublished,
	nextInLine,
	grabNext;

exports.remove = function(postData, request, response) {
	
	postData = postData.split(' ');
	unpublished = './client/' +
		request.headers.host +
		'/content/' +
		postData[0].split('-')[0] + '/' +
		postData[0] + '.json';
	nextInLine = './client/' +
		request.headers.host +
		'/content/' +
		postData[1].split('-')[0] + '/' +
		postData[1] + '.json';
		
	grabNext = function(content) {
		
		fs.readFile(content, function(error, data) {
			var cache;
			
			if (error) {
				
				errlog(__filename, error);
				
			} else {
				
				debug(__filename, 'Grabbing next published content piece in line, ' +
					postData[1] + '...');
				
				cache = JSON.parse(data);
				
				if (cache.published) {
					
					debug(__filename, '...Sending content back to client.');
					
					response.writeHead(200, {
						"Content-Type": "text/plain"
					});
					response.write(data);
					response.end();
					
				} else {
					
					debug(__filename,
						'...' + postData[1] + ' not published, trying next in line...');
					
					cache = parseInt(postData[1].match(/\d+/)[0], 10) - 1;
					
					postData[1] = cache > 0 ? postData[1].replace(/\d+/, cache) : '';
					
					nextInLine = './client/' +
						request.headers.host +
						'/content/' +
						postData[1].split('-')[0] + '/' +
						postData[1] + '.json';
					
					grabNext(nextInLine);
				}
				
			}
		});
	}
	
	grabNext(nextInLine);
	
	fs.readFile(unpublished, function(error, data) {
		var cache;
		
		if (error) {
			
			errlog(__filename, error);
		
		} else {
			
			debug(__filename, 'Request to remove/unpublish ' + postData[0] + '...');
			
			cache = JSON.parse(data);
			cache.published = false;
			
			fs.writeFile(unpublished, JSON.stringify(cache, null, '\t'),
				function(error, data) {
				
				if (error) {
					
					errlog(__filename, error);
					
				} else {
					
					debug(__filename, 'Content ' + postData[0] +
						' has been successfully unpublished.');
					
				}
				
			});
		}
		
	});
	
}