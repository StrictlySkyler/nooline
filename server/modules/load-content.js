var fs = require('fs');

var load = function(postData, response) {
	
	var i;
	var j;
	var len;
	var howMany;
	var whatKind;
	var file;
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
			
			fs.readdir('./client/content/' + i + '/', function(error, files) {
				if (error) {
					
					console.log(error);
	
				} else {
					whatKind = files[0].match(/\w+/)[0];
					
					console.log('...' + files.length + ' \"' +
						whatKind +
						'\" content items total.');
					
					if (files.length < postData[whatKind].howMany) {
						postData[whatKind].howMany = files.length;
					}
					
					aggregate(postData[whatKind], whatKind);
				}
			});
		}
	}
	
	console.log(contentTypesRequested + ' types of content have been requested.');
	
	var aggregate = function(obj, whatKind) {
		console.log('Grabbing ' +
			obj.howMany +
			' most recent \"' +
			whatKind +
			'\" content items...');
	
		for (i = 0, len = obj.howMany; i < len; i++) {
			
			file = whatKind + '-' + (obj.howMany - i) + '.json';
			
			console.log('...Grabbing content item: ' + file + '...');
			
			fs.readFile('./client/content/' +
				whatKind +
				'/' +
				file, 'utf8', function(error, data) {
				if (error) {
					
					console.log(error);
					
				} else {
					
					console.log('...' + whatKind + '-' +
						(obj.howMany - obj.content.length) +
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