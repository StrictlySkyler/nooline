// Add a new user to the system.

(function(N) {
	N.removeUser = function() {
		var section = document.getElementById('control-panel-1').children[0],
			panel = document.createElement('div'),
			category = document.getElementById('users-button'),
			existing = section.querySelectorAll('.control-panel-child'),
			i,
			len,
			closePanel,
			form,
			username,
			sure,
			really,
			message,
			creds = {},
			sendHash = new XMLHttpRequest();
		
		// Remove any existing panels we might have active at the time.
		if (existing.length > 0) {
			for (i = 0, len = existing.length; i < len; i++) {
				section.removeChild(existing[i]);
			}
		}
		
		section.appendChild(panel);
		
		category.className += ' active';
		
		panel.id = 'remove-user-panel';
		panel.className = 'control-panel-child remove-user-panel animate-all hidden';
		panel.innerHTML =
			'<h1 id="panel-title">Remove an existing user:</h1>' +
			'<button id="close-panel" class="close-panel button animate-all">' +
				'&times;' +
			'</button>' +
			'<form id="remove-user-form" method="POST" action="/remove-user">' +
				'<label for="username">Username:' +
					'<input name="username" id="username" type="text"' +
					'class="animate-all" />' +
				'</label>' +
				'<label for="sure">Sure?' +
					'<input name="sure" id="sure" type="checkbox" ' +
					'class="animate-all" />' +
				'</label>' +
				'<label for="really">Really sure?' +
					'<input name="really" id="really" type="checkbox" ' +
					'class="animate-all" />' +
				'</label>' +
				'<button id="go-button" class="go-button button animate-all">' +
					'Do it!' +
				'</button>' +
			'</form>' +
			'<h2 id="panel-message" class="animate-all">' +
				'Enter the username, and confirm.' +
			'</h2>';
			
		closePanel = document.getElementById('close-panel');
		form = document.getElementById('remove-user-form');
		username = document.getElementById('username');
		sure = document.getElementById('sure');
		really = document.getElementById('really');
		message = document.getElementById('panel-message');
				
		window.setTimeout(function() {
			
			panel.className = panel.className.replace(' hidden', '');
			
		}, 5);
		
		form.onsubmit = function(event) {
			var empty = N.checkForEmpty([username]);
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
				
				message.innerHTML = 'This field can\'t be blank.';
				message.className = message.className += ' error-message';
			} else if ((!sure.checked) ||
								 !(really.checked)) {
				var checkMatch = function() {
					
					if (this.checked) {
						this.className = this.className.replace(' input-error', '');
					}
				}
				
				if (!sure.className.match(/ input-error/)) {
					sure.className = sure.className += ' input-error';
				}
				
				if (!really.className.match(/ input-error/)) {
					really.className = really.className += ' input-error';
				}
				
				sure.onblur = checkMatch;
				really.onblur = checkMatch;
				
				message.innerHTML = 'Not gonna do it if you\'re not sure!';
				message.className = message.className += ' error-message';
			} else {
				
				creds.username = username.value;
				creds.sure = sure.checked;
				creds.really = sure.checked;
				creds.auth = {};
				creds.auth.username = N.user;
				creds.auth.password = N.password;
				
				if (message.className.match(/ error-message/)) {
					message.className = message.className.replace(' error-message', '');
				}
				
				message.innerHTML = 'Working...';
				
				sendHash.open('POST', '/remove-user', false);
				sendHash.setRequestHeader('Content-Type', 'text/plain');
				sendHash.onreadystatechange = function(event) {
					
					if (sendHash.readyState === 4) {
						
						switch (sendHash.status) {
							case 200:
								
								if (sendHash.responseText !== 'invalid') {
									username.value = '';
									sure.checked = false;
									really.checked = false;
									message.innerHTML = 'Success!  Remove another user?';
								} else {
									message.innerHTML = 'You don\'t have permission anymore.';
									message.className = message.className += ' error-message';
								}
								break;
							case 404:
								
								message.innerHTML = 'Oops!  No such user exists.';
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