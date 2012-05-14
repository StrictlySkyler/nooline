// This is the bulk of our login functionality, which provides all of the
// widgets for us to use when we login.
//
// Need to add a preventative measure to keep this from being used from the
// console; a check against the login should do, perhaps when the content is
// posted.

(function(N) {
	N.login = function() {
		// Grab all the content areas we'll be making editable.
		var contentAreas = document.querySelectorAll('.editable'),
			i,
			k,
			len,
			lon,
			// There should be only one of these; need to make this a getElementById
			loginMeta = document.querySelectorAll('.login')[0],
			logoutLink,
			sjcl = window.sjcl;
		
		// When we login, remove the login form.
		N.removeElement(document.getElementById('login-form'));
		
		// To allow for CSS3 transitions, we set the opacity to 0, since display:
		// none doesn't animate at this time. Then, after a quarter-second, we
		// change the text and set it back.
		loginMeta.style.opacity = 0;
		window.setTimeout(function() {
			loginMeta.innerHTML = 'You are logged in.  Click here to ' +
			'<a id="logout-link" class="animate-color" href="/logout">logout</a>.';
			loginMeta.style.opacity = 1;
			
			logoutLink = document.getElementById('logout-link');
			logoutLink.onclick = N.logout;
		}, 250);
		
		// Need to change this to store the hash, very likely. See note at
		// beginning.
		N.validCreds = true;
		
		// Add buttons for creating and editing content on each of the content
		// areas.
		for (i = 0, len = contentAreas.length; i < len; i++) {
			// If we've made the content area "addable" in the template, add the
			// button.
			if (contentAreas[i].className.match('addable')) {
				N.createAddContentButton(contentAreas[i]);
			}
			
			// Each content piece is editable, and gets an edit button appropriately.
			for (k = 0, lon = contentAreas[i].children.length; k < lon; k++) {
				
				if (contentAreas[i].className.match('editable')) {
				
					if (contentAreas[i].children[k].className.match('article')) {
						N.createEditContentButton(contentAreas[i].children[k]);
					}
				}
				
			}
		}
		
		// Add the control panel to the page to allow for admin tasks.
		N.createControlPanel();
		
	};
}(nooline));