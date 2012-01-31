(function(N) {
	N.createEditContentButton = function(element) {
		var editPost = document.createElement('button');
		
		element.insertBefore(editPost, element.children[0]);
		editPost.className = 'edit-post button animate-all hidden';
		editPost.title = 'Edit this blog post';
		editPost.innerHTML = 'Edit';
		editPost.onclick = N.editThis;
		
		window.setTimeout(function() {
			editPost.className = editPost.className.replace(' hidden', '');
			editPost.style.opacity = 1;
		}, 5);
	};
}(Newline));