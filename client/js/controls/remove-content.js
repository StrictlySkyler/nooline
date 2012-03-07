// Removes a specific piece of content from display on the page.
//
// This should be extended into an un/publish functionality.

(function(N) {
	
	N.removeContent = function(event) {
		if (!event) {
			event = window.event;
			event.returnValue = false;
		} else {
			event.preventDefault();
		}
		
		var self = this,
			content = self.parentNode.parentNode,
			contentArea = content.parentNode,
			name = content.id,
			contentArea = content.parentNode,
			form = content.querySelector('.post-form'),
			removeContent = new XMLHttpRequest(),
			undoButton,
			closeButton,
			nextInLine,
			newContent,
			blurb,
			article,
			title,
			body,
			details;
			
		N.undoCache = N.undoCache || {};
			
		N.removeElement(form, function() {
			
			N.undoCache[name] = content.innerHTML;
			
			content.className = content.className.replace('editing', 'removed');
			content.innerHTML = '<button id="' + name + '-undo-button"' +
				'class="animate-all undo-button button">Undo?</button>' +
				'<button id="' + name + '-close-undo" class="animate-all close-undo ' +
					'button">&times;</button>' +
				'<p>This content has been removed.</p>';
			
			undoButton = document.getElementById(name + '-undo-button');
			closeButton = document.getElementById(name + '-close-undo');
			
			nextInLine = contentArea.lastChild.id.split('-');
			nextInLine[1] = parseInt(nextInLine[1], 10) - 1;
			nextInLine = nextInLine[1] > 0 ? nextInLine.join('-') : '';
			
			removeContent.open('POST', '/remove-content', true);
			removeContent.setRequestHeader('Content-Type', 'text/plain');
			removeContent.onreadystatechange = function() {
				
				if ((removeContent.readyState === 4) &&
					(removeContent.status === 200)) {
					
					newContent = JSON.parse(removeContent.responseText);
					
				}
				
			};
			
			removeContent.send(name + ' ' + nextInLine);
			
			undoButton.onclick = function() {
				var i,
					len,
					kids;
				
				content.className = content.className.replace(' removed', '');
				content.innerHTML = N.undoCache[name];
				kids = content.children;
				
				N.createAddContentButton(contentArea);
				kids[0].onclick = N.editThis;
				
				for (i = 0, len = kids.length; i < len; i++) {
					kids[i].style.opacity = '';
					kids[i].style.display = '';
				}
				
				N.publishContent(name);
				
			};
			
			closeButton.onclick = function() {
				
				// Check to see if it is a blurb or not, altering some of the
				// elements created below.
				blurb = newContent.type === 'blurb' ? true : false;
				
				article = document.createElement('article');
				// To preserve some sanity in header heirarchy, we create an h2 for
				// blurbs, which (for now anyway) are site taglines/descriptions
				// near the first header.
				title = blurb ?
					document.createElement('h2') :
					document.createElement('h3');
				body = document.createElement('div');
				
				// Id the article.
				article.id = newContent.name;
				
				// Add a class to each of our articles based upon its index name.
				article.className = 'article ' + newContent.name;
				title.className = 'title';
				body.className = 'body';
				
				contentArea.appendChild(article);
				article.appendChild(title);
				article.appendChild(body);
				
				title.innerHTML = newContent.title;
				body.innerHTML = newContent.body;
				
				// If we're not dealing with a blurb, add the content details.
				if (!blurb) {
					details = document.createElement('p');
					details.className = 'details';
					article.appendChild(details);
					
					details.innerHTML = 'Posted by ' +
						newContent.author +
						' on ' +
						newContent.date.match(/\d+\/\d+\/\d+/)[0] +
						'.';
				}
				
				N.removeElement(content);
				
			};
			
		});
		
	};
	
}(nooline));