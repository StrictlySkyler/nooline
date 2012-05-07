// Add a new user to the system.

(function(N) {
	N.addUser = function() {
		var section = document.getElementById('control-panel-1').children[0],
			panel = document.createElement('div'),
			category = document.getElementById('users-button'),
			existing = section.querySelectorAll('.control-panel-child'),
			i,
			len,
			closePanel,
			form,
			username,
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
		
		panel.id = 'add-user-panel';
		panel.className = 'control-panel-child add-user-panel animate-all hidden';
		panel.innerHTML =
			'<h1 id="panel-title">Add a new user:</h1>' +
			'<button id="close-panel" class="close-panel button animate-all">' +
				'&times;' +
			'</button>' +
			'<form id="add-user-form" method="POST" action="/add-user">' +
				'<label for="username">Username:' +
					'<input name="username" id="username" type="text"' +
					'class="animate-all" />' +
				'</label>' +
				'<label for="password">Password:' +
					'<input name="password" id="password" type="password" ' +
					'class="animate-all" />' +
				'</label>' +
				'<label for="again">Again:' +
					'<input name="again" id="again" type="password" ' +
					'class="animate-all" />' +
				'</label>' +
				'<button id="go-button" class="go-button button animate-all">' +
					'Go!' +
				'</button>' +
			'</form>' +
			'<h2 id="panel-message" class="animate-all">' +
				'Enter credentials for the new user.' +
			'</h2>';
			
		closePanel = document.getElementById('close-panel');
		form = document.getElementById('add-user-form');
		username = document.getElementById('username');
		password = document.getElementById('password');
		again = document.getElementById('again');
		message = document.getElementById('panel-message');
				
		window.setTimeout(function() {
			
			panel.className = panel.className.replace(' hidden', '');
			
		}, 5);
		
		form.onsubmit = function(event) {
			var empty = N.checkForEmpty([username, password, again]);
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
				creds.password = sjcl.encrypt(password.value, password.value);
				
				if (message.className.match(/ error-message/)) {
					message.className = message.className.replace(' error-message', '');
				}
				
				message.innerHTML = 'Working...';
				
				sendHash.open('POST', '/add-user', false);
				sendHash.setRequestHeader('Content-Type', 'text/plain');
				sendHash.onreadystatechange = function(event) {
					
					if (sendHash.readyState === 4) {
						
						if (sendHash.status === 201) {
							
							username.value = '';
							password.value = '';
							again.value = '';
							message.innerHTML = 'Success!  Add another user?';
							
						} else if (sendHash.status === 409) {
							message.innerHTML = 'Oops!  That user already exists.';
							message.className = message.className += ' error-message';
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