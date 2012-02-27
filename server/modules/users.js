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
	debug = require('./logger.js').debug,
	errlog = require('./logger.js').error,

add = function(username, password) {
	
	// Encrypting the user password with the password as a key allows us to
	// decrypt the hash on the client with the password the user supplies at that
	// time.
	var hash = sjcl.encrypt(password, password);
	
	//Write the password out to a file keyed to the username.
	fs.writeFile('./shared/creds/' +
		username +
		'.hash', hash, 'utf8', function() {
		debug(__filename, 'Saved!');
	});
	
};

exports.add = add;