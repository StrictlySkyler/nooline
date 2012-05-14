// This file is used to create a user-key that allows a user to login. It needs
// to be included somewhere in the server, and ideally will eventually be paired
// with the ability to create users.
//
// For now:
//	var user = require('./users.js').add;
//	user.add('username', 'password');

// sjcl.js (Stanford JavaScript Crypto Library) is shared between client and
// server, and used to create the unique key for each user. We'll write the
// hashed key out to a file.

'use strict';

var sjcl = require('../../shared/js/lib/sjcl.js'),
	fs = require('fs'),
	check = require('./authenticate.js').check,
	debug = require('./logger.js').debug,
	errlog = require('./logger.js').error;

exports.add = function(postData, request, response) {
	var password,
		username,
		store = {};
	
	debug(__filename, 'Parsing data received from client for credentials.');
	postData = JSON.parse(postData, '\t', null);
	username = postData.username;
	password = postData.password;
	
	check(postData.auth, function(status) {
		
		switch (status) {
			case 'valid' :
				debug(__filename, 'Decrypting...');
				// Encrypting the user password with the password as a key allows us to
				// decrypt the hash on the client with the password the user supplies at
				// that time.
				store.username = username;
				store.password = password;
				
				debug(__filename, '...Success.  Writing to file.');
				
				fs.readFile('./server/creds/' +
					username +
					'.hash', function(error) {
					
					if (error) {
				
						//Write the password out to a file keyed to the username.
						fs.writeFile('./server/creds/' +
							username +
							'.hash', JSON.stringify(store), 'utf8', function() {
							debug(__filename, 'New user credentials for \"' +
										username +
										'\" saved!');
							
							response.writeHead(201, {
								"Content-Type" : "text/plain"
							});
							response.write('New user has been saved successfully.');
							response.end();
							
						});
					
					} else {
						debug(__filename, 'User credentials already exist!');
						
						response.writeHead(409, {
							"Content-Type" : "text/plain"
						});
						response.write('User credentials already exist.');
						response.end();
					}
				});
				break;
			
			case 'invalid' :
				
				debug(__filename, 'User credentials aren\'t valid!  ' +
							'New user creation not allowed.');
				response.writeHead(200, {
					"Content-Type": "text/plain"
				});
				response.write('invalid');
				response.end();
				break;
			
			case 'none' :
				
				debug(__filename, 'No user creds were found!  ' +
							'This might be an attack!');
				response.writeHead(403, {
					"Content-Type" : "text/plain"
				});
				response.write('Not a valid username!  Maybe someone hacking?!');
				response.end();
				break;
		}
		
	});
	
	
};

exports.remove = function(postData, request, response) {
	
	var username;
	
	debug(__filename, 'Parsing data received from client for username.');
	postData = JSON.parse(postData, '\t', null);
	
	check(postData.auth, function(status) {
		
		switch (status) {
			case 'valid':
				
				if (postData.really && postData.sure) {
					username = postData.username;
					
					debug(__filename, 'Attempting to remove user \"' + username + '\"...');
					
					fs.unlink('./server/creds/' +
										username +
										'.hash', function(error) {
						if (error) {
							debug(__filename, 'Unable to remove the user!  ' +
										 'Try checking to see that the hash file actually exists,' +
										 ' and that the server has permissions to access it.');
							
							response.writeHead(404);
							response.end();
						} else {
							debug(__filename, '...User \"' +
										username +
										'\" has been removed successfully.');
							
							response.writeHead(200);
							response.end();
						}
					})
				}
				break;
			case 'invalid':
				
				debug(__filename, 'User credentials aren\'t valid!  ' +
							'User removal not allowed.');
				response.writeHead(200, {
					"Content-Type": "text/plain"
				});
				response.write('invalid');
				response.end();
				break;
			case 'none':
				
				debug(__filename, 'No user creds were found!  ' +
							'This might be an attack!');
				response.writeHead(403, {
					"Content-Type" : "text/plain"
				});
				response.write('Not a valid username!  Maybe someone hacking?!');
				response.end();
				break;
		}
		
	});
	
};

exports.change = function(postData, request, response) {
	
	var store,
		old,
		username,
		password;
	
	debug(__filename, 'Parsing data recieved from client for username and ' +
				'proper authorization.');
	postData = JSON.parse(postData, '\t', null);
	
	username = postData.username;
	old = postData.old;
	password = postData.password;
	
	check(postData.auth, function(status) {
		
		switch (status) {
			case 'valid':
				
				fs.readFile('./server/creds/' +
					username +
					'.hash', 'utf8', function(error, data) {
						
					if (error) {
						debug(__filename, 'Unable to remove the user!  ' +
										 'Try checking to see that the hash file actually exists,' +
										 ' and that the server has permissions to access it.');
							
						response.writeHead(404);
						response.end();
					} else {
						
						store = JSON.parse(data, null, '\t');
						try {
							if (sjcl.decrypt(store.password, old)) {
								store.password = sjcl.decrypt(store.password, password);
								
								fs.writeFile('./server/creds/' +
									username +
									'.hash', JSON.stringify(store), 'utf8', function() {
										
									debug(__filename, 'New password for \"' +
												username +
												'\" saved!');
								
									response.writeHead(200, {
										"Content-Type" : "text/plain"
									});
									response.write('New password has been saved successfully.');
									response.end();
								});
							}
						} catch (e) {
							debug(__filename, 'Invalid old password provided!');
							response.writeHead(401, {
								"Content-Type" : "text/plain"
							});
							response.write('Invalid old password!');
							response.end();
						}
						
					}
						
					});
				
				break;
			case 'invalid':
				
				debug(__filename, 'User credentials aren\'t valid!  ' +
							'Password change not allowed.');
				response.writeHead(200, {
					"Content-Type": "text/plain"
				});
				response.write('invalid');
				response.end();
				break;
			case 'none':
				
				debug(__filename, 'No user creds were found!  ' +
							'This might be an attack!');
				response.writeHead(403, {
					"Content-Type" : "text/plain"
				});
				response.write('Not a valid username!  Maybe someone hacking?!');
				response.end();
				break;
		}
		
	});
	
};