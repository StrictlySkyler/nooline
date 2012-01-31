(function(N) {
	
	N.editThis = function() {
		var self = this,
			parent = self.parentNode,
			name = parent.id,
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
			//optionsButton,
			updateButton;
			
		if (parent === parent.parentNode.children[1]) {
			N.removeElement(addNewPostButton);
		}
		
		form.className = 'animate-all post-form';
		form.style.opacity = 0;
		form.style.position = 'absolute';
		form.innerHTML = '<label>Post Title:</label>' +
			'<input type="text" class="animate-all userinput title" />' +
			'<label>Post Content:</label>' +
			'<textarea class="animate-all userinput body"></textarea>' +
			'<button class="edit-controls animate-all close-edit-post">' +
				'&times;</button>' +
			'<button class="edit-controls animate-all edit-post-options">' +
				'<div>{</div></button>' +
			'<button class="edit-controls animate-all update-edit-post">' +
				'Update</button>';
		
		form.onsubmit = function(event) {
			event.preventDefault();
		}
		
		newTitle = form.querySelectorAll('.title')[0]
		newBody = form.querySelectorAll('.body')[0]
		
		newTitle.value = currentTitle.innerHTML;
		newBody.value = currentBody.innerHTML;
		
		closeButton = form.querySelectorAll('.close-edit-post')[0];
		updateButton = form.querySelectorAll('.update-edit-post')[0];
		
		closeButton.onclick = N.closeThis;
		updateButton.onclick = N.updateThis;
			
		content.push(self,
								 parent.querySelectorAll('.title')[0],
								 parent.querySelectorAll('.body')[0],
								 parent.querySelectorAll('.details')[0]);
		
		for (i = 0, len = content.length; i < len; i++) {
			if (!content[i].className.match(' animate-all')) {
				content[i].className += ' animate-all';
			}
			content[i].style.opacity = 0;
		}
		
		window.setTimeout(function() {
			for (i = 0, len = content.length; i < len; i++) {
				content[i].style.display = 'none';
				form.style.opacity = 1;
				form.style.position = '';
			}
			
		}, 500);
		
		parent.appendChild(form);
		
	}
	
}(Newline));