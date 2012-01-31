(function(N) {
	N.createLoginForm = function(event) {
		if (!event) {
			event = window.event;
			event.returnValue = false;
		} else {
			event.preventDefault();
		}
		
		var loginForm,
			closeButton;

		if (document.getElementById('login-form') === null) {
			loginForm = document.createElement('form')

			loginForm.id = 'login-form';
			loginForm.action = '/login';
			loginForm.method = 'POST';
			loginForm.className = 'animate-all hidden';
			loginForm.innerHTML = '<label for="username">Username:</label>' +
				'<input type="text" tabindex="1" id="username" ' +
				'class="animate-all" name="username" />' +
				'<label for="password">Password:</label>' +
				'<input type="password" tabindex="1" id="password" ' +
				'class="animate-all" name="password" />' +
				'<input type="submit" tabindex="1" class="animate-all" value="Login" />' +
				'<button tabindex="1" class="close-button animate-all" ' +
				'title="Close Login Form">&times;</button>';

			N.header.appendChild(loginForm);
			closeButton = loginForm.querySelectorAll('.close-button')[0];
			closeButton.onclick = N.closeThis;
			
			N.originalZ = window.getComputedStyle ?
				window.getComputedStyle(loginForm, null).getPropertyValue('z-index') :
				loginForm.currentStyle.zIndex;

			loginForm.onsubmit = N.submitLogin;

			window.setTimeout(function() {
				loginForm.className = loginForm.className.replace(' hidden', '');
				loginForm.style.opacity = 1;
			}, 5);
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
}(Newline));