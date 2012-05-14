// Checks to see if the creds we have match for a user on the server, and if
// they're valid or not.
//
// Currently uses the Stanford JavaScript Crypto Library (sjcl) for decryption:
// http://crypto.stanford.edu/sjcl/

(function(N) {
	N.getCreds = function(username, password, persist) {
		var hash,
			decrypted,
			getHash = new XMLHttpRequest(),
			sjcl = window.sjcl,
			hash,
			creds = {};
		
		creds.username = username;
		if (!persist) {
		 creds.password = sjcl.encrypt(password, password);
		} else {
			creds.password = password;
		}
		
		// Send the username to the server, which responds with a hash for the
		// username, if it has one. If not, it'll respond with a 404, which means
		// the username doesn't exist.
		getHash.open('POST', '/login', false);
		getHash.setRequestHeader('Content-Type', 'text/plain');
		getHash.onreadystatechange = function(event) {

			if ((getHash.readyState === 4) && (getHash.status === 200)) {

				hash = getHash.responseText;
				
				// If the username exists, let's try to decrypt it.
				if (hash === 'none') {
					
					alert('We\'re unable to find that user.');
				} else if (hash === 'invalid') {
					
					alert('Wrong password.');
				} else {
					
					N.login();
					
					// Set our cookie for tracking session authentication.
					document.cookie = 'user=|' + creds.username + '|user;';
					document.cookie = 'hash=|' + creds.password + '|hash;';
					
					N.user = creds.username;
					N.password = creds.password;
				}
					
			}
		};
		getHash.send(JSON.stringify(creds));
	};
}(nooline));