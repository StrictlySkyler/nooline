(function(N) {
	N.createAddContentButton = function(element) {
		var addPost = document.createElement('button');
		
		element.insertBefore(addPost, element.children[0]);
		addPost.className = 'add-post button animate-all hidden';
		addPost.title = 'Add a new blog post';
		addPost.id = 'add-blog-post';
		addPost.innerHTML = '+';
		addPost.onclick = N.createPostForm;
		
		window.setTimeout(function() {
			addPost.className = addPost.className.replace(' hidden', '');
			addPost.style.opacity = 1;
		}, 5);
	};
}(Newline));