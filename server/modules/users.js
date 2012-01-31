var sjcl = require('../../shared/js/lib/sjcl.js');
var fs = require('fs');

var add = function(username, password) {

	var hash = sjcl.encrypt(password, password);
	
	fs.writeFile('./shared/creds/' + username + '.hash', hash, 'utf8', function() {
		console.log('Saved!');
	});
	
};

exports.add = add;