(function(N) {
	N.logout = function(event) {
		event.preventDefault();
		
		var contentAreas = document.querySelectorAll('.content'),
			addPostButtons = document.querySelectorAll('.add-post'),
			editPostButtons = document.querySelectorAll('.edit-post'),
			loginMeta = document.querySelectorAll('.login')[0],
			openPosts = document.querySelectorAll('.new-post'),
			loginLink,
			i,
			len;
					
		document.cookie = 'user=null;expires=Thu, 01-Jan-70 00:00:01 GMT';
		document.cookie = 'tracker=null;expires=Thu, 01-Jan-70 00:00:01 GMT';
		N.validCreds = false;
		
		for (i = 0, len = addPostButtons.length; i < len; i++) {
			N.removeElement(addPostButtons[i]);
		}
		
		for (i = 0, len = editPostButtons.length; i < len; i++) {
			N.removeElement(editPostButtons[i]);
		}
		
		for (i = 0, len = openPosts.length; i < len; i++) {
			N.removeElement(openPosts[i]);
		}
		
		loginMeta.style.opacity = 0;
		window.setTimeout(function() {
			loginMeta.innerHTML = '<hr>' +
			'Click here to ' +
			'<a id="login-link" class="animate-color" href="/login">login</a>.';
			loginMeta.style.opacity = 1;
			
			loginLink = document.getElementById('login-link');
			loginLink.onclick = N.createLoginForm;
		}, 250);
	};
}(Newline));