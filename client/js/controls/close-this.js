// Closes thatever form field is associated with the "close button" clicked.
//
// Need to clean up this file, referencing elements more cleanly, and using
// getElementById.

(function(N) {
	
	// Catch for old IE, which doesn't support event.preventDefault.
	N.closeThis = function(event) {
		if (!event) {
			event = window.event;
			event.returnValue = false;
		} else {
			event.preventDefault();
		}
			
		
		var self = this,
			i,
			len,
			sure,
			// The form element itself.
			parent = self.parentNode,
			// The name of the content piece we're editing, i.e. blog-5.
			name = parent.parentNode.parentNode.id,
			// The type of content we're editing, and the section in the template.
			contentArea = self.parentNode.parentNode.parentNode,
			// The article itself in which the form element lives.
			article = self.parentNode.parentNode,
			// Current title and body of the content, if any. Should switch this to
			// getElemenyById.
			currentTitle = parent.parentNode.querySelectorAll('.title')[0],
			currentBody = parent.parentNode.querySelectorAll('.body')[0],
			newTitle,
			newBody,
			content = [];
		
		// If it's the login form we're removing, just yank it right out.
		if (self.parentNode.id === 'login-form') {
			
			N.removeElement(self.parentNode);
			
		// Otherwise, if existing content has been edited, verify that the user
		// wants to abandon them, and add back our content editing buttons.
		//
		// This part needs to be cleaned up some.
		} else if (self.className.match('edit-controls')) {
			
			newTitle = parent.querySelectorAll('.title')[0];
			newBody = parent.querySelectorAll('.body')[0];
			
			content.push(parent.parentNode.querySelectorAll('.edit-post')[0],
				parent.parentNode.querySelectorAll('.title')[0],
				parent.parentNode.querySelectorAll('.body')[0]);
			
			if (name !== 'blurb') {
				content.push(parent.parentNode.querySelectorAll('.details')[0]);
			}
			
			// Check to see if the content has changed.
			if ((newTitle.value !== currentTitle.innerHTML) ||
					newBody.value !== currentBody.innerHTML) {
				
				sure = window.confirm('You\'ve made some changes to this content.  ' +
					'Are you sure you want to abandon them?');
				
				if (sure) {
					N.removeElement(parent);
					
					parent.parentNode.className =
						parent.parentNode.className.replace(' editing', '');
					
					for (i = 0, len = content.length; i < len; i++) {
						content[i].style.display = '';
					}
					
					window.setTimeout(function() {
						for (i = 0, len = content.length; i < len; i++) {
							content[i].style.opacity = '';
						}
						if (contentArea.className.match('addable')) {
							
							N.createAddContentButton(contentArea);
						}
					}, 250);
				}
				
			// If no content has been changed from what was being edited, just remove
			// the fields.
			} else {
				N.removeElement(parent);
				
				parent.parentNode.className =
					parent.parentNode.className.replace(' editing', '');
				
				for (i = 0, len = content.length; i < len; i++) {
					content[i].style.display = '';
				}
				
				window.setTimeout(function() {
					for (i = 0, len = content.length; i < len; i++) {
						content[i].style.opacity = '';
					}
					
					if (contentArea.className.match('addable')) {
						
						N.createAddContentButton(contentArea);
					}
				}, 250);
			}
			
		// If existing content isn't being edited, check to see if new content is
		// being added. If it is, confirm that it will be abandoned.
		} else if (N.checkForContent(self)) {
			
			sure = window.confirm('You have unsaved content.  ' +
				'Are you sure you want to abadon this new post?');
			
			if (sure) {
				window.setTimeout(function() {
					if (contentArea.className.match('addable')) {
						
						N.createAddContentButton(contentArea);
					}
					
					N.removeElement(article);
				}, 250);
			}
			
		// If nothing has changed, and no new content has been added, just remove
		// the form.
		} else if (N.validCreds) {
		
			N.createAddContentButton(contentArea);
			N.removeElement(article);
		}
		
	};
}(nooline));