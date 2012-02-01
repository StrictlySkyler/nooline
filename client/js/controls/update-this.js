(function(N) {
	
	N.updateThis = function(event) {
		event.preventDefault();
		
		var self = this,
			kids = self.parentNode.querySelectorAll('.userinput'),
			parent = self.parentNode,
			i,
			len,
			emptyNodes = N.checkForEmpty(kids),
			content = {},
			postContent = new XMLHttpRequest(),
			contentArea = self.parentNode.parentNode.parentNode,
			article,
			title,
			body,
			details,
			blurb;
			
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
		} else {
			
			blurb = contentArea.id === 'blurb' ? true : false;
			content.type = contentArea.id;
			if (parent.parentNode === contentArea.children[0]) {
				content.name = contentArea.children[0].className
						.match(new RegExp(contentArea.id + '-' + '\\d+'))[0];
			} else {
				content.name = contentArea.children[1].className
						.match(new RegExp(contentArea.id + '-' + '\\d+'))[0];
			}
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
			
			postContent.open('POST', '/update-content', true);
			postContent.setRequestHeader('Content-Type', 'text/plain');
			postContent.send(JSON.stringify(content, null, '\t'));
			
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
			
			N.removeElement(self.parentNode.parentNode);
			N.createEditContentButton(contentArea.children[0]);
			if (contentArea.className.match('addable')) {
				N.createAddContentButton(contentArea);
			}
		}
	}
	
}(Newline));