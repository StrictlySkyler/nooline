(function(N) {
	N.getCreds = function(username, password) {
		var hash,
			decrypted,
			getHash = new XMLHttpRequest();

		getHash.open('POST', '/login', true);
		getHash.setRequestHeader('Content-Type', 'text/plain');
		getHash.onreadystatechange = function(event) {

			if ((getHash.readyState === 4) && (getHash.status === 200)) {

				hash = getHash.responseText;
				invalid = /error404!/.test(hash);

				if (!invalid) {
					try {
						decrypted = sjcl.decrypt(password, hash);
					} catch (e) {
						decrypted = false;
						console.log('Wrong password.');
					}
					finally {
						if (decrypted === password) {
							N.login(username, password);
						}
					}
				} else {
					console.log('We\'re unable to find that user.');
				}
			}
		};
		getHash.send(username);
	};
}(Newline));