// Add a new user to the system.

(function(N) {
	N.changePassword = function() {
		var section = document.getElementById('control-panel-1').children[0],
			panel = document.createElement('div'),
			category = document.getElementById('users-button'),
			existing = section.querySelectorAll('.control-panel-child'),
			i,
			len,
			closePanel,
			form,
			username,
			old,
			password,
			again,
			message,
			creds = {},
			sendHash = new XMLHttpRequest(),
			sjcl = window.sjcl;
		
		// Remove any existing panels we might have active at the time.
		if (existing.length > 0) {
			for (i = 0, len = existing.length; i < len; i++) {
				section.removeChild(existing[i]);
			}
		}
		
		section.appendChild(panel);
		
		category.className += ' active';
		
		panel.id = 'change-password-panel';
		panel.className = 'control-panel-child change-password-panel animate-all ' +
			'hidden';
		panel.innerHTML =
			'<h1 id="panel-title">Change a user\'s password:</h1>' +
			'<button id="close-panel" class="close-panel button animate-all">' +
				'&times;' +
			'</button>' +
			'<form id="change-password-form" method="POST" ' +
				'action="/change-password">' +
				'<label for="username">Username:' +
					'<input name="username" id="username" type="text"' +
					'class="animate-all" />' +
				'</label>' +
				'<label for="old">Old one:' +
					'<input name="old" id="old" type="password" ' +
					'class="animate-all" />' +
				'</label>' +
				'<label for="password">New one:' +
					'<input name="password" id="password" type="password" ' +
					'class="animate-all" />' +
				'</label>' +
				'<label for="again">And again:' +
					'<input name="again" id="again" type="password" ' +
					'class="animate-all" />' +
				'</label>' +
				'<button id="go-button" class="go-button button animate-all">' +
					'Go!' +
				'</button>' +
			'</form>' +
			'<h2 id="panel-message" class="animate-all">' +
				'Enter the user\'s credentials.' +
			'</h2>';
			
		closePanel = document.getElementById('close-panel');
		form = document.getElementById('change-password-form');
		username = document.getElementById('username');
		old = document.getElementById('old');
		password = document.getElementById('password');
		again = document.getElementById('again');
		message = document.getElementById('panel-message');
				
		window.setTimeout(function() {
			
			panel.className = panel.className.replace(' hidden', '');
			
		}, 5);
		
		form.onsubmit = function(event) {
			var empty = N.checkForEmpty([username, old, password, again]);
			if (!event) {
				event = window.event;
				event.returnValue = false;
			} else {
				event.preventDefault();
			}
			
			if (empty.length > 0) {
				for (i = 0, len = empty.length; i < len; i++) {
					if (!empty[i].className.match(/ input-error/)) {
						empty[i].className = empty[i].className += ' input-error';
					}
						
					empty[i].onblur = function() {
						if (this.value !== '') {
							this.className = this.className
								.replace(' input-error', '');
						}
					}
				}
				
				message.innerHTML = 'No fields are allowed to be blank.';
				message.className = message.className += ' error-message';
			} else if (password.value !== again.value) {
				var checkMatch = function() {
					
					if (password.value === again.value) {
						password.className = password.className.replace(' input-error', '');
						again.className = again.className.replace(' input-error', '');
					}
				}
				
				if (!password.className.match(/ input-error/)) {
					password.className = password.className += ' input-error';
				}
				
				if (!again.className.match(/ input-error/)) {
					again.className = again.className += ' input-error';
				}
				
				password.onblur = checkMatch;
				again.onblur = checkMatch;
				
				message.innerHTML = 'These fields must exactly match.';
				message.className = message.className += ' error-message';
			} else {
				
				creds.username = username.value;
				creds.old = sjcl.encrypt(old.value, old.value);
				creds.password = sjcl.encrypt(old.value, password.value);
				creds.auth = {};
				creds.auth.username = N.user;
				creds.auth.password = N.password;
				
				if (message.className.match(/ error-message/)) {
					message.className = message.className.replace(' error-message', '');
				}
				
				message.innerHTML = 'Working...';
				
				sendHash.open('POST', '/change-password', false);
				sendHash.setRequestHeader('Content-Type', 'text/plain');
				sendHash.onreadystatechange = function(event) {
					
					if (sendHash.readyState === 4) {
						
						switch (sendHash.status) {
							case 200:
								
								if (sendHash.responseText !== 'invalid') {
									username.value = '';
									old.value = '';
									password.value = '';
									again.value = '';
									message.innerHTML = 'Success!  Change another password?';
								} else {
									message.innerHTML = 'You don\'t have permission anymore.';
									message.className = message.className += ' error-message';
								}
								break;
							case 404:
								
								message.innerHTML = 'Oops!  No such user exists.';
								message.className = message.className += ' error-message';
								break;
							case 401:
								
								message.innerHTML = 'Yikes!  That old password is wrong.';
								message.className = message.className += ' error-message';
								break;
							case 403:
								
								message.innerHTML = '*Your* username doesn\'t exist.  Hacking?';
								message.className = message.className += ' error-message';
								break;
						}
						
					}
					
				};
				sendHash.send(JSON.stringify(creds));
				
			}
		};
		
		closePanel.onclick = function(event) {
			
			N.removeElement(panel);
			category.className = category.className.replace(' active', '');
		};
		
	};
}(nooline));