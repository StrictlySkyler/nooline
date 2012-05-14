// This module is responsible for finding the crypto hash associated with a
// username, and sending it back to the client, so the client can check to see
// if the creds provided allow logging in. All it does, essentially, is serve up
// the appropriate hash.
//
// It's possible to replace this with another authentication mechanism, should a
// developer choose; right now the work is pushed off to the client.

'use strict';

var fs = require('fs'),
	debug = require('./logger.js').debug,
	errlog = require('./logger.js').error,
	sjcl = require('../../shared/js/lib/sjcl.js');

// Grab the username the client has sent to us, and search for the username.hash
// file matching the username passed to us. Then, serve back the contents of
// that file, which are a crypto hash containing the user's password.
exports.auth = function(request, response) {
	
	var postData = '',
		store,
		creds,
		result;
	
	request.setEncoding('utf8');
	
	request.addListener('data', function(chunk) {
		
		postData += chunk;
		
	});
	
	request.addListener('end', function() {
		
		debug(__filename, 'User credentials received, searching for match...');
		
    try {
		  creds = JSON.parse(postData, null, '\t');
    } catch (e) {
      errlog(__filename, e);
    }
		fs.readFile('./server/creds/' +
							creds.username +
							'.hash', 'utf8', function(error, data) {
		
		if (error) {
			debug(__filename, '...Couldn\'t find a hash file for the user \'' +
									creds +
									'\'.');
			
			result = 'none';
			response.writeHead(200, {
				'Content-Type' : 'text/plain'
			});
			response.write(result);
			response.end();
			
		} else {
			
      try {
  			store = JSON.parse(data, null, '\t');
      } catch (e) {
        errlog(__filename, e);
      }
			debug(__filename, '...Found a match for \"' + store.username + '\", ' +
						'checking password...');
			
			try {
				if (sjcl.decrypt(store.password, creds.password)) {
					
					result = 'success';
					debug(__filename, '...Password valid.');
					
				}
			} catch (e) {
				
				result = 'invalid';
				debug(__filename, '...Password invalid.');
				
			} finally {
				response.writeHead(200, {
					'Content-Type' : 'text/plain'
				});
				response.write(result);
				response.end();
				
				debug(__filename, 'Results sent back to client!');
			}
		}
		
	});
		
	});
	
};

exports.check = function(creds, callback) {
	
	var store;
	
	fs.readFile('./server/creds/' +
							creds.username +
							'.hash', 'utf8', function(error, data) {
		
		if (error) {
			
			callback('none');
		} else {
			
			store  = JSON.parse(data, null, '\t');
			
			try {
				if (sjcl.decrypt(store.password, creds.password)) {
					
					callback('valid');
					
				}
			} catch (e) {
				
				callback('invalid');
			}
			
		}
		
	});
};
