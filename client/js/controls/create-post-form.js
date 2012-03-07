// Creates the form for adding a new post, typically called by the "add content"
// button.
//
// Need to implement an "options" button.

(function(N) {
	N.createPostForm = function(event) {
		// Standard prevent default w/ catch for IE.
		if (!event) {
			event = window.event;
			event.returnValue = false;
		} else {
			event.preventDefault();
		}
		
		var self = this,
			closeButton,
			//optionsButton,
			saveButton,
			// Grab the name of the content area in which we're working, to determine
			// type.
			name = self.parentNode.id,
			inputs,
			form,
			i,
			len,
			newPost = document.createElement('article'),
			// Next most recent content piece before then one we're making.
			mostRecentSibling;
			
		// Build out our new post form.
		newPost.className = 'new-post animate-all hidden';
		newPost.innerHTML = '<form id="add-' + name +'-post-form"' +
				'action="/post" method="POST" class="animate-all post-form">' +
			'<button id="close-' + name + '-form"' +
				'class="animate-all close-new-post new-post-controls" ' +
				'title="Cancel New Post">&times;</button>' +
			'<button id="save-' + name + '-post"' +
				'class="animate-all save-new-post new-post-controls" ' +
				'title="Save Post">Save</button>' +
			'<label for="' + name + '-post-title">Post Title:' + '</label>' +
			'<input id="' + name + '-post-title" name="' + name + '-post-title" ' +
				'class="animate-all userinput title" type="text" />' +
			'<label for="' + name + '-post-body">Post Content:</label>' +
			'<textarea id="' + name + '-post-body" class="animate-all ' +
				'body userinput"></textarea>' +
			'</form>';
			
		// If we have multiple content pieces, increment the number by 1.
		//
		// Probably should refactor to label as 1 if it's the only content piece.
		if (self.parentNode.children.length > 1) {
			mostRecentSibling = self.nextSibling;
			newPost.className += ' ' + name + '-' + (parseInt(
				mostRecentSibling.className
					.match(new RegExp(name + '-' + '\\d+'))[0]
					.split('-')[1]
				, 10) + 1);
		}
		
		// Insert at top of list.
		self.parentNode.insertBefore(newPost, self.parentNode.children[1]);
		
		// Grab all the possible user input fields in our new form.
		inputs = self.parentNode.querySelectorAll('.userinput');

		// Should change this to a getElementById
		form = newPost.querySelectorAll('.post-form')[0];
		
		// This all happens async, so we don't actually use the form to post.
		form.onsubmit = function(event) {
			if (!event) {
				event = window.event;
				event.returnValue = false;
			} else {
				event.preventDefault();
			}
		};
		
		// Remove the add content button while we're adding content already.
		N.removeElement(self);
		
		// Get form controls and assign listeners.
		closeButton = document.getElementById('close-' + name + '-form');
		closeButton.onclick = N.closeThis;
		//Options Button Event Listener Goes Here
		saveButton = document.getElementById('save-' + name + '-post');
		saveButton.onclick = N.saveThis;
		
		// On focus of the form elements, check to see if our input errors are
		// resolved.
		for (i = 0, len = inputs.length; i < len; i++) {
			inputs[i].onfocus = N.errorCheck;
		}
		
		// Set our timeout to let CSS transitions fire after the element is ready to
		// be animated.
		window.setTimeout(function() {
			
			newPost.className = newPost.className.replace(' hidden', '');
			// Adding a second delay to the opacity animation is a little easier on
			// the browser, even when the GPU is initialized. This part should be
			// cleaned up some, to not need extraneous style accomodations like this.
			window.setTimeout(function() {
				newPost.style.opacity = 1;
			}, 250);
		}, 5);
	};
}(nooline));