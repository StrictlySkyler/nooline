// Similar to the save-this.js (N.saveThis) functionality, this method updates
// an existing content piece by overwriting the key value pairs with new ones.
//
// Renaming the old file might be a good way to implement a revision system.

(function(N) {
	
	N.updateThis = function(event) {
		// Standard prevent default with catch for older IE.
		if (!event) {
			event = window.event;
			event.returnValue = false;
		} else {
			event.preventDefault();
		}
		
		var self = this,
			// Get all of the form elements.
			kids = self.parentNode.querySelectorAll('.userinput'),
			parent = self.parentNode,
			i,
			len,
			// Check to see if any of them are empty.
			emptyNodes = N.checkForEmpty(kids),
			content = {},
			postContent = new XMLHttpRequest(),
			contentArea = self.parentNode.parentNode.parentNode,
			article,
			title,
			body,
			details,
			blurb;
			
		// If any of the fields are empty, let the user know about it, adding a
		// class to the element, and flashing the elements.
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
			
			window.setTimeout(function() {
				for (i = 0, len = emptyNodes.length; i < len; i++) {
					emptyNodes[i].style.background = '';
					emptyNodes[i].style.borderColor = '';
				}
			}, 250);
			
		// If none of the fields are empty, build out the content object, send it to
		// the server, and update the content in the DOM.
		} else {
			
			// Check to see if we're dealing with a blurb or not.
			blurb = contentArea.id === 'blurb' ? true : false;
			content.type = contentArea.id;
			// Catch to see if the node we're editing is the first one in the content
			// area or not. If it is, then the "add content" button is gone, and the
			// name is set to equal the appropriate class name of the content piece.
			// If it isn't, then set the class name appropriately otherwise.
			if (parent.parentNode === contentArea.children[0]) {
				content.name = contentArea.children[0].className
						.match(new RegExp(contentArea.id + '-' + '\\d+'))[0];
			} else {
				// Need to check this part out – looks like it's targeting the wrong
				// element.
				content.name = contentArea.children[1].className
						.match(new RegExp(contentArea.id + '-' + '\\d+'))[0];
			}
			// Published and visible or not? Hook for a future publish/unpublish
			// mechanism.
			content.published = true;
			// Setting the date; would be nice to abstract to a config or options
			// place, such as N.config, or something similar.
			content.date = (new Date().getMonth() + 1) + '/' +
				new Date().getDate() + '/' +
				new Date().getFullYear() +
				' at ' +
				new Date().getHours() + ':' +
				new Date().getMinutes() + ':' +
				new Date().getSeconds();
			// Set the author to whomever has logged to make the change. Adding an
			// "edited by" array would be nice, with dates, based upon whether the
			// author is the same or not.
			content.author = document.cookie
				.match(/user=\|.+\|user/)[0]
				.split('|')[1];
			content.title = self.parentNode
				.querySelectorAll('.title')[0]
				.value;
			content.body = self.parentNode
				.querySelectorAll('.body')[0]
				.value;
			
			// Send the content object to the server as JSON.
			postContent.open('POST', '/update-content', true);
			postContent.setRequestHeader('Content-Type', 'text/plain');
			postContent.send(JSON.stringify(content, null, '\t'));
			
			// Create the elements to add to the DOM with the new content. Might be
			// deprecated when copying the code from the save-this.js file; need to
			// check this behavior. Should be able to just update the existing
			// elements, and show them.
			article = document.createElement('article');
			title = blurb ?
				document.createElement('h2') :
				document.createElement('h3');
			body = document.createElement('div');
			
			article.className = 'article ' + content.name;
			title.className = 'title';
			body.className = 'body';
			
			contentArea.insertBefore(article, contentArea.children[0]);
			article.appendChild(title);
			article.appendChild(body);
			
			title.innerHTML = content.title;
			body.innerHTML = content.body;
				
			if (!blurb) {
				details = document.createElement('p');
				details.className = 'details';
				article.appendChild(details);
				details.innerHTML = 'Posted by ' +
					content.author +
					' on ' +
					content.date.match(/\d+\/\d+\/\d+/)[0] +
				'.';
			}
			
			// Remove the form-editing field, and add back the content management
			// buttons.
			N.removeElement(self.parentNode.parentNode);
			N.createEditContentButton(contentArea.children[0]);
			// Need to add a check to see if the "add content" button is already
			// there; might very well be, if we're not editing the first content
			// piece.
			if (contentArea.className.match('addable')) {
				N.createAddContentButton(contentArea);
			}
		}
	};
	
}(nooline));