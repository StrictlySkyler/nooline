(function(N) {
	N.createPostForm = function(event) {
		event.preventDefault();
		
		var self = this,
			closeButton,
			//optionsButton,
			saveButton,
			name = self.parentNode.id,
			inputs,
			form,
			i,
			len,
			newPost = document.createElement('article'),
			mostRecentSibling;
			
		newPost.className = 'new-post animate-all hidden';
		newPost.innerHTML = '<form id="add-' + name +'-post-form"' +
				'action="/post" method="POST" class="animate-all post-form">' +
			'<label for="' + name + '-post-title">Post Title:' + '</label>' +
			'<input id="' + name + '-post-title" name="' + name + '-post-title" ' +
				'class="animate-all userinput title" type="text" />' +
			'<label for="' + name + '-post-body">Post Content:</label>' +
			'<textarea id="' + name + '-post-body" class="animate-all ' +
				'body userinput"></textarea>' +
			'<button id="close-' + name + '-form"' +
				'class="animate-all close-new-post new-post-controls" title="Cancel New' +
				' Post">&times;</button>' +
			'<button id="' + name + '-post-options"' +
				'class="animate-all new-post-options new-post-controls" title="Post ' +
				'Options"><div>{</div></button>' +
			'<button id="save-' + name + '-post"' +
				'class="animate-all save-new-post new-post-controls" title="Save Post">Save</button>' +
			'</form>';
			
		if (self.parentNode.children.length > 1) {
			mostRecentSibling = self.nextSibling;
			newPost.className += ' ' + name + '-' + (parseInt(
				mostRecentSibling.className
					.match(new RegExp(name + '-' + '\\d+'))[0]
					.split('-')[1]
				, 10) + 1);
		}
		
		self.parentNode.insertBefore(newPost, self.parentNode.children[1]);
		
		inputs = self.parentNode.querySelectorAll('.userinput');
		
		form = newPost.querySelectorAll('.post-form')[0];
		
		form.onsubmit = function(event) {
			event.preventDefault();
		}
		
		N.removeElement(self);
		
		closeButton = document.getElementById('close-' + name + '-form');
		closeButton.onclick = N.closeThis;
		//Options Button Event Listener Goes Here
		saveButton = document.getElementById('save-' + name + '-post');
		saveButton.onclick = N.saveThis;
		
		for (i = 0, len = inputs.length; i < len; i++) {
			inputs[i].onfocus = N.errorCheck;
		}
		
		window.setTimeout(function() {
			
			newPost.className = newPost.className.replace(' hidden', '');
			window.setTimeout(function() {
				newPost.style.opacity = 1;
			}, 250);
		}, 5);
	};
}(Newline));