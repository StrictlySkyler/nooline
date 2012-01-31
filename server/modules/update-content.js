var fs = require('fs');

var update = function(postData, response) {
	
	var content = JSON.parse(postData);
	var count = 1;
	var file = './client/content/' +
		content.type +
		'/' +
		content.name +
		'.json';
		
	fs.writeFile(file, JSON.stringify(content, null, '\t'), function(error) {
		if (error) {
			
			console.log(error);
			
		} else {
			
			console.log('Content ' + file + ' has been updated.');
			
			response.writeHead(201, {
				"Content-Type" : "text/plain"
			});
			response.write('Content has been saved successfully.');
			response.end();
			
		}
	});
	
}

exports.update = update;