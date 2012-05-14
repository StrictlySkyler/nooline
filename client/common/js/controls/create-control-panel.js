// Create and add the button for adding more content.

(function(N) {
	N.createControlPanel = function() {
		var panel = document.createElement('div'),
			container = document.getElementById('container'),
			i,
			len,
			buttons = [],
			addUser,
			removeUser,
			usersButton,
			subnav,
			changePassword;
		
		document.body.insertBefore(panel, document.body.children[0]);
		// Panel starts out with the "hidden" class, and opacity of 0...
		// (See note 1.)
		panel.className = 'control-panel-1 control-panel-wrapper animate-all ' +
			'hidden';
		panel.id = 'control-panel-1';
		panel.innerHTML =
			'<section id="control-panel-inner" class="control-panel-inner ' +
				'animate-all">' +
				'<ul id="control-panel-1-nav" class="control-panel-nav">' +
					'<li>' +
						'<button id="users-button" class="users-button nav-top hidden animate-all">' +
							'Users' +
						'</button>' +
						'<ul class="control-panel-subnav">' +
							'<li>' +
								'<button id="add-user" class="nav-second animate-all">' +
									'Add User' +
								'</button>' +
							'</li>' +
							'<li>' +
								'<button id="remove-user" class="nav-second animate-all">' +
									'Remove User' +
								'</button>' +
							'</li>' +
							'<li>' +
								'<button id="change-password" class="nav-second animate-all">' +
									'Change Password' +
								'</button>' +
							'</li>' +
						'</ul>' +
					'</li>' +
				'</ul>' +
			'</section>';
		
		container.className = container.className += ' logged-in';
		
		usersButton = document.getElementById('users-button');
		addUser = document.getElementById('add-user');
		removeUser = document.getElementById('remove-user');
		changePassword = document.getElementById('change-password');
		
		addUser.onclick = N.addUser;
		removeUser.onclick = N.removeUser;
		changePassword.onclick = N.changePassword;
		
		usersButton.onfocus = function() {
			subnav = usersButton.nextElementSibling.querySelectorAll('.nav-second');
			usersButton.nextElementSibling.style.display = 'block';
			
			for (i = 0, len = subnav.length; i < len; i++) {
				subnav[i].onblur = function() {
					var onSubnav;
					
					// When using keyboard navigation, the focus goes to the document body
					// before registering on the next element as might be expected. By
					// building in a micro-delay, we'll catch when the browser registers
					// the focus event on the element properly.
					window.setTimeout(function() {
						
						for (i = 0, len = subnav.length; i < len; i++) {
							if (document.activeElement === subnav[i]) {
								onSubnav = true;
								
								break;
							}
						}
						
						if ((!onSubnav) &&
								(document.activeElement !== usersButton)){
							usersButton.nextElementSibling.style.display = '';
						}
						
					});
					
				};
			}
		};
		
		usersButton.onblur = function() {
			// See above statement about timeouts and window focus.
			window.setTimeout(function() {
				var onSubnav;
				
				for (i = 0, len = subnav.length;
						 i < len;
						 i++) {
					
					if (document.activeElement === subnav[i]) {
						onSubnav = true;
						
						break;
					} else {
						usersButton.nextElementSibling.style.display = '';
					}
				}
			}, 5);
		};
		
		// (Note 1:)
		// ...Which we remove very quickly, and set the opacity to 1,
		// which allows for CSS transitions to animate. Without this delay, the
		// transition doesn't animate properly – it appears to fire too soon,
		// causing the element to just appear suddenly.
		window.setTimeout(function() {
			
			panel.className = panel.className.replace(' hidden', '');
			buttons = panel.querySelectorAll('.nav-top');
			
			for (i = 0, len = buttons.length; i < len; i++) {
				
				buttons[i].className = buttons[i].className.replace(' hidden', '');
			}
		}, 100);
	};
}(nooline));