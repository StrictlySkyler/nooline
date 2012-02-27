// Create and add the button for adding more content.

(function(N) {
	N.createAddContentButton = function(element) {
		var addPost = document.createElement('button');
		
		element.insertBefore(addPost, element.children[0]);
		// Button starts out with the "hidden" class, and opacity of 0...
		addPost.className = 'add-post button animate-all hidden';
		addPost.title = 'Add a new blog post';
		addPost.id = 'add-blog-post';
		addPost.innerHTML = '+';
		addPost.onclick = N.createPostForm;
		
		// ...Which we remove very quickly, and set the opacity to 1, which allows
		// for CSS transitions to animate. Without this delay, the transition
		// doesn't animate properly – it appears to fire too soon, causing the
		// element to just "appear".
		window.setTimeout(function() {
			addPost.className = addPost.className.replace(' hidden', '');
		}, 5);
	};
}(nooline));