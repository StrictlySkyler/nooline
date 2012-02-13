// This module is responsible for finding the crypto hash associated with a
// username, and sending it back to the client, so the client can check to see
// if the creds provided allow logging in. All it does, essentially, is serve up
// the appropriate hash.
//
// It's possible to replace this with another authentication mechanism, should a
// developer choose; right now the work is pushed off to the client.

/*jslint node: true, white: true, maxerr: 50, indent: 2 */
'use strict';

var fs = require('fs'),

hash,
creds,

// Grab the username the client has sent to us, and search for the username.hash file matching the username passed to us.  Then, serve back the contents of that file, which are a crypto hash containing the user's password.
auth = function(request, response) {
	
	var postData = '';
	
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	request.addListener('end', function() {
				
		creds = postData;
		
		fs.readFile('./shared/creds/' +
							creds +
							'.hash', 'utf8', function(error, data) {
		
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