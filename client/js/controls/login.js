(function(N) {
	N.login = function(user, trackerCookie) {
		var contentAreas = document.querySelectorAll('.editable'),
			i,
			k,
			len,
			lon,
			loginMeta = document.querySelectorAll('.login')[0],
			logoutLink;
			
		document.cookie = 'user=|' + user + '|user;'
		document.cookie = 'tracker=|' + trackerCookie + '|tracker;'
		
		N.removeElement(document.getElementById('login-form'));
		
		loginMeta.style.opacity = 0;
		window.setTimeout(function() {
			loginMeta.innerHTML = '<hr>' +
			'You are logged in.  Click here to ' +
			'<a id="logout-link" class="animate-color" href="/logout">logout</a>.';
			loginMeta.style.opacity = 1;
			
			logoutLink = document.getElementById('logout-link');
			logoutLink.onclick = N.logout;
		}, 250);
		
		N.validCreds = true;
		
		for (i = 0, len = contentAreas.length; i < len; i++) {
			if (contentAreas[i].className.match('addable')) {
				N.createAddContentButton(contentAreas[i]);
			}
			
			for (k = 0, lon = contentAreas[i].children.length; k < lon; k++) {
				
				if (contentAreas[i].className.match('editable')) {
				
					if (contentAreas[i].children[k].className.match('article')) {
						N.createEditContentButton(contentAreas[i].children[k]);
					}
				}
				
			}
		}
		
	};
}(Newline));