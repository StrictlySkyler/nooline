// Responsible for saving content to the server, usually called from a "save"
// button.

(function(N) {
  N.saveThis = function(event) {
		// Standard prevent default with catch for older IE.
		if (!event) {
			event = window.event;
			event.returnValue = false;
		} else {
			event.preventDefault();
		}
		
		var self = this,
			// Grab all the fields that contain user input.
			kids = self.parentNode.querySelectorAll('.userinput'),
			i,
			len,
			// Find if any of them are empty.
			emptyNodes = N.checkForEmpty(kids),
			content = {},
			postContent = new XMLHttpRequest(),
			contentArea = self.parentNode.parentNode.parentNode,
			article,
			title,
			body,
			details;
		
		// If emptyNodes has a length at all, some of the fields are empty, so
		// add an error class to reflect it, along with letting the user know
		// visually.
		if (emptyNodes.length > 0) {
			for (i = 0, len = emptyNodes.length; i < len; i++) {
				emptyNodes[i].style.background = '#f0c';
				emptyNodes[i].style.borderColor = '#f00';
				emptyNodes[i].value = 'You need a content ' +
					N.getInputType(emptyNodes[i]) +
					'!';
				if (!/input-error/.test(emptyNodes[i].className)) {
					emptyNodes[i].className += ' input-error';
				}
			}
			
			// Timeout to remove the flash once we've shown it.
			window.setTimeout(function() {
				for (i = 0, len = emptyNodes.length; i < len; i++) {
					emptyNodes[i].style.background = '';
				emptyNodes[i].style.borderColor = '';
				}
			}, 250);
			
		// If none of the fields are empty, build our content, send it to the
		// server, and put it in the page.
		} else {
			
			// Build all the key value pairs in the content object.
			content.type = contentArea.id;
			content.name = contentArea.id +
				'-' +
				(parseInt(contentArea.children[1].className
					.match(new RegExp(contentArea.id + '-' + '\\d+'))[0]
					.split('-')[1], 10) + 1);
			// Published and visible or not? Hook for a future publish/unpublish
			// mechanism.
			content.published = true;
			// The date would be a nice thing to make configurable. Perhaps accessible
			// in a method such as N.config?
			content.date = (new Date().getMonth() + 1) + '/' +
				new Date().getDate() + '/' +
				new Date().getFullYear() +
				' at ' +
				new Date().getHours() + ':' +
				new Date().getMinutes() + ':' +
				new Date().getSeconds();
			content.author = document.cookie
				.match(/user=\|.+\|user/)[0]
				.split('|')[1];
			content.title = self.parentNode
				.querySelectorAll('.title')[0]
				.value;
			content.body = self.parentNode
				.querySelectorAll('.body')[0]
				.value;
			
			// Send the content to the server as JSON.
			postContent.open('POST', '/post-content', true);
			postContent.setRequestHeader('Content-Type', 'text/plain');
			postContent.send(JSON.stringify(content, null, '\t'));
			
			// Create the content piece in the page itself. Need to catch for blurbs
			// and notes.
			article = document.createElement('article');
			title = document.createElement('h3');
			body = document.createElement('div');
			details = document.createElement('p');
			
			article.className = 'article ' + content.name;
			title.className = 'title';
			body.className = 'body';
			details.className = 'details';
			
			// Insert our content element before the existing content.
			contentArea.insertBefore(article, contentArea.children[0]);
			article.appendChild(title);
			article.appendChild(body);
			article.appendChild(details);
			
			title.innerHTML = content.title;
			body.innerHTML = content.body;
			details.innerHTML = 'Posted by ' +
				content.author +
				' on ' +
				content.date.match(/\d+\/\d+\/\d+/)[0] +
				'.';
			
			// Remove the form, and add back the content management buttons.
			N.removeElement(self.parentNode.parentNode);
			N.createEditContentButton(contentArea.children[0]);
			N.createAddContentButton(contentArea);
			
		}
  };
}(nooline));