// Create the buttons for editing new content.

(function(N) {
	N.createEditContentButton = function(element) {
		var editPost = document.createElement('button');
		
		// Every content section with the "editable" class gets an edit button on
		// each of its content pieces. They have the "hidden" class to start, along
		// with an opacity of 0...
		element.insertBefore(editPost, element.children[0]);
		editPost.className = 'edit-post button animate-all hidden';
		editPost.title = 'Edit this blog post';
		editPost.innerHTML = 'Edit';
		editPost.onclick = N.editThis;
		
		// ...Which we remove quickly after they've been added, allowing for CSS
		// transitions to fire. Without the slight delay, the transitions don't fire
		// properly, as they try to animate before the element is ready.
		window.setTimeout(function() {
			editPost.className = editPost.className.replace(' hidden', '');
		}, 5);
	};
}(nooline));