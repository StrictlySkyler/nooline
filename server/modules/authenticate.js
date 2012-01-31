var fs = require('fs');

var hash;
var creds;

var auth = function(request, response) {
	
	var postData = '';
	
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	request.addListener('end', function() {
				
		creds = postData;
		
		fs.readFile('./shared/creds/' +
							creds +
							'.hash', encoding='utf8', function(error, data) {
		
		if (error) {
			console.log('Couldn\'t find a hash file for the user \'' +
									creds +
									'\'.');
			
			hash = 'error404!';
			response.writeHead(200, {
				'Content-Type' : 'text/plain'
			});
			response.write(hash);
			response.end();
			
		} else {
			hash = data;
			response.writeHead(200, {
				'Content-Type' : 'text/plain'
			});
			response.write(hash);
			response.end();
		}
		
	});
		
	});
	
};

exports.auth = auth;