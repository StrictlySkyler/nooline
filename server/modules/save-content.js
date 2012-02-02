var fs = require('fs');

var save = function(postData, request, response) {
	
	var content = JSON.parse(postData);
	var count = 1;
	var file = './client/content/' +
		request.headers.host +
		'/' +
		content.type +
		'/' +
		content.type +
		'-' +
		count +
		'.json';
	
	var fileCheck = function() {
		fs.readFile(file, function(error, data) {
			
			if (error) {
				
				fs.writeFile(file, JSON.stringify(content, null, '\t'),
					function(error) {
					if (error) {
						
						console.log(error);
						
					} else {
						
						console.log('Content saved as ' + file + '.');
						
						response.writeHead(201, {
							"Content-Type" : "text/plain"
						});
						response.write('Content has been saved successfully.');
						response.end();
						
					}
				});
			} else {
				
				count++;
				file = './client/content/' +
					request.headers.host +
					'/' +
					content.type +
					'/' +
					content.type +
					'-' +
					count +
					'.json';
				fileCheck();
				
			}
		});
	}
	
	fileCheck();
	

	
};

exports.save = save;