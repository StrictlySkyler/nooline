// Edit an existing form, typically called from an "edit" button on a piece of
// content.

(function(N) {
	
	N.editThis = function() {
		var self = this,
			parent = self.parentNode,
			name = parent.parentNode.id,
			i,
			len,
			sure,
			form = document.createElement('form'),
			content = [],
			addNewPostButton = parent.parentNode.children[0],
			currentTitle = parent.querySelectorAll('.title')[0],
			currentBody = parent.querySelectorAll('.body')[0],
			newTitle,
			newBody,
			closeButton,
			updateButton,
			removeButton;
		
		// If the first piece of content is being edited, remove the "add new"
		// button while it's being edited.
		if (parent === parent.parentNode.children[1]) {
			N.removeElement(addNewPostButton);
		}
		
		form.className = 'animate-all post-form';
		form.style.opacity = 0;
		form.style.position = 'absolute';
		form.innerHTML ='<button class="button edit-controls animate-all ' +
			'close-edit-post">&times;</button>' +
			'<button class="button edit-controls animate-all update-edit-post">' +
				'Update</button>' +
			'<button class="button edit-controls animate-all edit-post-remove">' +
				'Remove</button>' +
			'<input type="text" class="animate-all userinput title" />' +
			'<textarea class="animate-all userinput body"></textarea>';
		
		form.onsubmit = function(event) {
			if (!event) {
				event = window.event;
				event.returnValue = false;
			} else {
				event.preventDefault();
			}
		};
		
		
		// Grab the new form fields...
		//
		// (Need to change this to getElementById)
		newTitle = form.querySelectorAll('.title')[0];
		newBody = form.querySelectorAll('.body')[0];
		// ...And set their values to the current ones.
		newTitle.value = currentTitle.innerHTML;
		newBody.value = currentBody.innerHTML;
		
		// Set the height of the form fields to the height of the current content.
		//
		// Need to change the font, also.
		newTitle.style.height = currentTitle.offsetHeight + 'px';
		newBody.style.height = currentBody.offsetHeight + 'px';
		
		parent.className += ' editing';
		
		// Change this to getElementById.
		closeButton = form.querySelectorAll('.close-edit-post')[0];
		updateButton = form.querySelectorAll('.update-edit-post')[0];
		removeButton = form.querySelectorAll('.edit-post-remove')[0];
		
		// Set our event listeners.
		closeButton.onclick = N.closeThis;
		updateButton.onclick = N.updateThis;
		removeButton.onclick = N.removeContent;
		
		// Push all the content to an array, which we'll hide.
		//
		// Need to switch this to getElementById.
		content.push(self,
			parent.querySelectorAll('.title')[0],
			parent.querySelectorAll('.body')[0]);
		
		// Blurbs don't get the details right now.
		if (name !== 'blurb') {
			
			content.push(parent.querySelectorAll('.details')[0]);
		
		}
		
		// Notes need to have a width set, too. Need to abstract this to a class in
		// the template.
		if (name === 'notes') {
			newTitle.style.width = currentTitle.offsetWidth + 'px';
			newBody.style.width = currentBody.offsetWidth + 'px';
		}
		
		// Add the animation helper class to the content. This should be a plugin
		// someday.
		for (i = 0, len = content.length; i < len; i++) {
			if (!content[i].className.match(' animate-all')) {
				content[i].className += ' animate-all';
			}
			content[i].style.opacity = 0;
		}
		
		// Hide the content after it isn't visible anymore, and then show the form.
		window.setTimeout(function() {
			for (i = 0, len = content.length; i < len; i++) {
				content[i].style.display = 'none';
			}
			form.style.opacity = '';
			form.style.position = '';
			
		}, 500);
		
		// Add the form to the article parent.
		parent.appendChild(form);
		
	};
	
}(nooline));