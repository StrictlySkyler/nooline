var fs = require('fs');

var load = function(postData, request, response) {
	
	var i;
	var j;
	var len;
	var howMany;
	var whatKind;
	var file;
	var total;
	var contentTypesRequested = 0;
	var contentTypesComplete = 0;
	
	postData = JSON.parse(postData);
	
	for (i in postData) {
		if (postData.hasOwnProperty(i)) {
			contentTypesRequested++;
			
			console.log(postData[i].howMany +
				' \"' +
				i +
				'\" content items requested...');
			
			postData[i].content = [];
			
			fs.readdir('./client/content/' +
				request.headers.host +
				'/' +
				i +
				'/', function(error, files) {
				if (error) {
					
					console.log(error);
	
				} else {
					total = files.length;
					
					whatKind = files[0].match(/\w+/)[0];
					
					console.log('...' + files.length + ' \"' +
						whatKind +
						'\" content items total.');
					
					if (total < postData[whatKind].howMany) {
						postData[whatKind].howMany = total;
					}
					
					aggregate(postData[whatKind], whatKind, total);
				}
			});
		}
	}
	
	console.log(contentTypesRequested + ' types of content have been requested.');
	
	var aggregate = function(obj, whatKind, total) {
		console.log('Grabbing ' +
			obj.howMany +
			' most recent \"' +
			whatKind +
			'\" content items...');
	
		for (i = 0, len = obj.howMany; i < len; i++) {
			
			file = whatKind + '-' + (total - i) + '.json';
			
			console.log('...Grabbing content item: ' + file + '...');
			
			fs.readFile('./client/content/' +
				request.headers.host +
				'/' +
				whatKind +
				'/' +
				file, 'utf8', function(error, data) {
				if (error) {
					
					console.log(error);
					
				} else {
					
					console.log('...' + whatKind + '-' +
						(total - obj.content.length) +
						'.json grabbed...');
					
					obj.content.push(data);
					
					if (obj.content.length === obj.howMany) {
						contentTypesComplete++;
						
						console.log('...All \"' +
							whatKind +
							'\" content items have been grabbed.');
						
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
		}
	}
}

exports.load = load;