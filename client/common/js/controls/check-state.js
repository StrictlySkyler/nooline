// Check to see if we've logged in already or not.

(function(N) {
	
	N.checkState = function() {
		// Test to see if our credentials are in the cookie.
		var hashCheck = /hash=\|.+\|hash/.test(document.cookie),
			username = /user=\|.+\|user/.test(document.cookie);
		
		// If they are, grab out the value, and pass 'em to the getCreds method.
		if (username && hashCheck) {
			hashCheck = document.cookie.match(/hash=\|.+\|hash/)[0];
			username = document.cookie.match(/user=\|.+\|user/)[0];
			
			hashCheck = hashCheck.replace('hash=|', '');
			hashCheck = hashCheck.replace('|hash', '');
			username = username.replace('user=|', '');
			username = username.replace('|user', '');
			
			N.getCreds(username, hashCheck, true);
		}
		
	};
}(nooline));