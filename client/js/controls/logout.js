// Logout current user when the logout button is clicked.

(function(N) {
	N.logout = function(event) {
		// Prevent our default behavior with a catch for IE.
		if (!event) {
			event = window.event;
			event.returnValue = false;
		} else {
			event.preventDefault();
		}
		
		// Gather all the content areas, add-post buttons, edit-post buttons, and
		// posts in progress.
		var contentAreas = document.querySelectorAll('.content'),
			addPostButtons = document.querySelectorAll('.add-post'),
			editPostButtons = document.querySelectorAll('.edit-post'),
			// Need to change this to getElementById
			loginMeta = document.querySelectorAll('.login')[0],
			openPosts = document.querySelectorAll('.new-post'),
			controlPanel = document.getElementById('control-panel-1'),
			container = document.getElementById('container'),
			loginLink,
			i,
			len;
					
		// Expire the cookie creds.
		document.cookie = 'user=null;expires=Thu, 01-Jan-70 00:00:01 GMT';
		document.cookie = 'hash=null;expires=Thu, 01-Jan-70 00:00:01 GMT';
		// Need to refactor this – see login.js for details.
		N.validCreds = false;
		
		// Remove each of the elements gathered.
		for (i = 0, len = addPostButtons.length; i < len; i++) {
			N.removeElement(addPostButtons[i]);
		}
		
		for (i = 0, len = editPostButtons.length; i < len; i++) {
			N.removeElement(editPostButtons[i]);
		}
		
		for (i = 0, len = openPosts.length; i < len; i++) {
			N.removeElement(openPosts[i]);
		}
		
		N.removeElement(controlPanel);
		container.className = container.className.replace(' logged-in', '');
		
		// Hide the login meta field, so that it can be animated with CSS
		// transitions if desired.
		loginMeta.style.opacity = 0;
		// When the animation has completed (presumably) change the meta to allow
		// logging in.
		window.setTimeout(function() {
			loginMeta.innerHTML = 'Click here to ' +
			'<a id="login-link" class="animate-color" href="/login">login</a>.';
			loginMeta.style.opacity = 1;
			
			loginLink = document.getElementById('login-link');
			loginLink.onclick = N.createLoginForm;
		}, 250);
	};
}(nooline));