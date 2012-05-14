// Create the login form; the point of entry adding content to a site.

(function(N) {
	N.createLoginForm = function(event) {
		// When the login link is clicked, prevent default behaviour.  Catch for IE.
		if (!event) {
			event = window.event;
			event.returnValue = false;
		} else {
			event.preventDefault();
		}
		
		var loginForm,
			closeButton;
			
		// Make sure there isn't already a login form on the page.
		if (document.getElementById('login-form') === null) {
			// If there isn't, create one, along with the appropriate fields.
			loginForm = document.createElement('form');

			loginForm.id = 'login-form';
			loginForm.action = '/login';
			loginForm.method = 'POST';
			loginForm.className = 'animate-all hidden';
			loginForm.innerHTML = '<label for="username">Username:</label>' +
				'<input type="text" id="username" ' +
				'class="animate-all" name="username" />' +
				'<label for="password">Password:</label>' +
				'<input type="password" id="password" ' +
				'class="animate-all" name="password" />' +
				'<input type="submit" class="animate-all" ' +
				'value="Login" />' +
				'<button class="close-button animate-all" ' +
				'title="Close Login Form">&times;</button>';
				
			// Add the form to the site header, and assign our ecent listener.
			N.header.appendChild(loginForm);
			closeButton = loginForm.querySelectorAll('.close-button')[0];
			closeButton.onclick = N.closeThis;
			
			// Get the original z-index of the form, catching for IE.
			// 
			// Looks like this can probably be removed – older implementation which
			// wasn't chosen.
			N.originalZ = window.getComputedStyle ?
				window.getComputedStyle(loginForm, null).getPropertyValue('z-index') :
				loginForm.currentStyle.zIndex;
				
			// Call our custom submit method when we login.
			loginForm.onsubmit = N.submitLogin;
			
			// To allow CSS transitions to fire properly, we need to add a delay to
			// when we remove CSS properties keeping them hidden, otherwise they fire
			// before the element is ready to be animated.
			window.setTimeout(function() {
				loginForm.className = loginForm.className.replace(' hidden', '');
				loginForm.style.opacity = 1;
			}, 5);
			
		// If the login form already does exist on the page, flash it at the user to
		// let them know.
		} else {
			
			loginForm = document.getElementById('login-form');
			loginForm.style.borderColor = '#f00';
			loginForm.style.background = '#f0c';

			window.setTimeout(function() {
				loginForm.style.borderColor = '';
				loginForm.style.background = '';
			}, 250);
		}
	};
}(nooline));