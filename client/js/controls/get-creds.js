// Checks to see if the creds we have match for a user on the server, and if
// they're valid or not.
//
// Currently uses the Stanford JavaScript Crypto Library (sjcl) for decryption:
// http://crypto.stanford.edu/sjcl/

(function(N) {
	N.getCreds = function(username, password) {
		var hash,
			decrypted,
			invalid,
			getHash = new XMLHttpRequest(),
			sjcl = window.sjcl;
			
		// Send the username to the server, which responds with a hash for the
		// username, if it has one. If not, it'll respond with a 404, which means
		// the username doesn't exist.
		getHash.open('POST', '/login', true);
		getHash.setRequestHeader('Content-Type', 'text/plain');
		getHash.onreadystatechange = function(event) {

			if ((getHash.readyState === 4) && (getHash.status === 200)) {

				hash = getHash.responseText;
				invalid = /error404!/.test(hash);
				
				// If the username exists, let's try to decrypt it.
				if (!invalid) {
					try {
						decrypted = sjcl.decrypt(password, hash);
					} catch (e) {
						decrypted = false;
						window.alert('Wrong password.');
					}
					// Finally, if our decryption succeeds and our password matches the
					// decrypted hash, we login.
					finally {
						if (decrypted === password) {
							N.login(username, password);
						}
					}
				} else {
					window.alert('We\'re unable to find that user.');
				}
			}
		};
		getHash.send(username);
	};
}(nooline));