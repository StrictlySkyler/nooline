(function(N) {

'use strict';

// Delcare a global namespace object, in which we'll build our members.
var nooline = window.nooline = {},
	readyCheck;

// Some browsers don't implement the onreadystatechange event, so we'll build
// in a timer to check for us. If it doesn't exist, we check every 50ms to see
// if the document has finished loading. If it has, we execute the function
// below.
if (!document.onreadystatechange) {
	
	readyCheck = setInterval(function() {
		
		if (document.readyState === 'complete') {
			clearInterval(readyCheck);
			document.onreadystatechange();
		}
	}, 50);
	
}

// When the document is finished loading, we check to see if the client can
// support what we're doing here with \nooline. If not, or it's unlikely, we
// warn them.
document.onreadystatechange = function() {
	
	if ((document.readyState === 'complete') &&
			(!nooline.runBuildOnce)) {
		(function(N) {
			var i,
				len,
				legacy,
				legacyClient,
				riskLink,
				ignoreRisk = function() {
					document.body.removeChild(legacy);
				};
				
			// Some preliminary browser sniffing. This should be changed to feature
			// detection, catching to see if the client supports querySelectorAll and
			// XMLHttpRequest. Suffice to say for now that this shorthand achieves the
			// job, and should be revisited.
			N.UA = window.navigator.userAgent;
			document.cookie = 'script=true';
			legacyClient = ['Firefox/3', 'MSIE 6', 'MSIE 7', 'MSIE 8'];
			
			for (i = 0, len = legacyClient.length; i < len; i++) {
				if (N.UA.match(legacyClient[i])) {
					// Here we create our warning.
					legacy = document.createElement('div');
					legacy.id = 'legacy';
					legacy.innerHTML = '<div id="warning">' +
						'<p>It looks like you\'re using an older, less-functional ' +
						'browser.  Yikes.</p><p>You really should use the latest version ' +
						'of <a target="_blank" href="http://www.google.com/chrome">' +
						'Chrome</a> or <a target="_blank" href="http://getfirefox.com">' +
						'Firefox</a>.</p>' +
						'<p>You can proceed anyway if you\'d like, but no guarantees ' +
						'this site is gonna work, or even look right.  <a ' +
						'id="browse-risk">Browse at your own risk</a>.</p></div>';
					document.body.insertBefore(legacy, document.body.children[0]);
					
					riskLink = document.getElementById('browse-risk');
					riskLink.onclick = ignoreRisk;
				}
			}
			
			// The initial setup properties are created.
			N.loginLink = document.getElementById('login-link');
			N.header = document.getElementById('header');
			N.mainNav = document.getElementById('main-nav').children[0];
			N.runBuildOnce = true;
			
			// Get our initial content, based on our template.
			N.getContent();
			
			N.loginLink.onclick = N.createLoginForm;
			
		}(nooline));
	}
};

// Add a new user to the system.

(function(N) {
	N.addUser = function() {
		var section = document.getElementById('control-panel-1').children[0],
			panel = document.createElement('div'),
			category = document.getElementById('users-button'),
			existing = section.querySelectorAll('.control-panel-child'),
			i,
			len,
			closePanel,
			form,
			username,
			password,
			again,
			message,
			creds = {},
			sendHash = new XMLHttpRequest(),
			sjcl = window.sjcl;
		
		// Remove any existing panels we might have active at the time.
		if (existing.length > 0) {
			for (i = 0, len = existing.length; i < len; i++) {
				section.removeChild(existing[i]);
			}
		}
		
		section.appendChild(panel);
		
		category.className += ' active';
		
		panel.id = 'add-user-panel';
		panel.className = 'control-panel-child add-user-panel animate-all hidden';
		panel.innerHTML =
			'<h1 id="panel-title">Add a new user:</h1>' +
			'<button id="close-panel" class="close-panel button animate-all">' +
				'&times;' +
			'</button>' +
			'<form id="add-user-form" method="POST" action="/add-user">' +
				'<label for="username">Username:' +
					'<input name="username" id="username" type="text"' +
					'class="animate-all" />' +
				'</label>' +
				'<label for="password">Password:' +
					'<input name="password" id="password" type="password" ' +
					'class="animate-all" />' +
				'</label>' +
				'<label for="again">Again:' +
					'<input name="again" id="again" type="password" ' +
					'class="animate-all" />' +
				'</label>' +
				'<button id="go-button" class="go-button button animate-all">' +
					'Go!' +
				'</button>' +
			'</form>' +
			'<h2 id="panel-message" class="animate-all">' +
				'Enter credentials for the new user.' +
			'</h2>';
			
		closePanel = document.getElementById('close-panel');
		form = document.getElementById('add-user-form');
		username = document.getElementById('username');
		password = document.getElementById('password');
		again = document.getElementById('again');
		message = document.getElementById('panel-message');
				
		window.setTimeout(function() {
			
			panel.className = panel.className.replace(' hidden', '');
			
		}, 5);
		
		form.onsubmit = function(event) {
			var empty = N.checkForEmpty([username, password, again]);
			if (!event) {
				event = window.event;
				event.returnValue = false;
			} else {
				event.preventDefault();
			}
			
			if (empty.length > 0) {
				for (i = 0, len = empty.length; i < len; i++) {
					if (!empty[i].className.match(/ input-error/)) {
						empty[i].className = empty[i].className += ' input-error';
					}
						
					empty[i].onblur = function() {
						if (this.value !== '') {
							this.className = this.className
								.replace(' input-error', '');
						}
					}
				}
				
				message.innerHTML = 'No fields are allowed to be blank.';
				message.className = message.className += ' error-message';
			} else if (password.value !== again.value) {
				var checkMatch = function() {
					
					if (password.value === again.value) {
						password.className = password.className.replace(' input-error', '');
						again.className = again.className.replace(' input-error', '');
					}
				}
				
				if (!password.className.match(/ input-error/)) {
					password.className = password.className += ' input-error';
				}
				
				if (!again.className.match(/ input-error/)) {
					again.className = again.className += ' input-error';
				}
				
				password.onblur = checkMatch;
				again.onblur = checkMatch;
				
				message.innerHTML = 'These fields must exactly match.';
				message.className = message.className += ' error-message';
			} else {
				
				creds.username = username.value;
				creds.password = sjcl.encrypt(password.value, password.value);
				creds.auth = {};
				creds.auth.username = N.user;
				creds.auth.password = N.password;
				
				if (message.className.match(/ error-message/)) {
					message.className = message.className.replace(' error-message', '');
				}
				
				message.innerHTML = 'Working...';
				
				sendHash.open('POST', '/add-user', false);
				sendHash.setRequestHeader('Content-Type', 'text/plain');
				sendHash.onreadystatechange = function(event) {
					
					if (sendHash.readyState === 4) {
						
						switch (sendHash.status) {
							case 201:
								
								username.value = '';
								password.value = '';
								again.value = '';
								message.innerHTML = 'Success!  Add another user?';
								break;
							case 409:
								
								message.innerHTML = 'Oops!  That user already exists.';
								message.className = message.className += ' error-message';
								break;
							case 200:
								
								if (sendHash.responseText === 'invalid') {
									
									message.innerHTML = 'You don\'t have permission anymore.';
									message.className = message.className += ' error-message';
								}
								break;
							case 403:
								
								message.innerHTML = '*Your* username doesn\'t exist.  Hacking?';
								message.className = message.className += ' error-message';
								break;
						}
						
					}
					
				};
				sendHash.send(JSON.stringify(creds));
				
			}
		};
		
		closePanel.onclick = function(event) {
			
			N.removeElement(panel);
			category.className = category.className.replace(' active', '');
		};
		
	};
}(nooline));

/*jslint browser: true, plusplus: true, white: true, maxerr: 50, indent: 2 */

// Build out all of the content that we've grabbed.

(function(N) {
	
	// Some counters for loops and things we'll define later.
	var i,
		len,
		targetArea,
		article,
		title,
		body,
		details,
		blurb;
	
	// The aggregator object, passed from the N.getContent method, contains all
	// our content from the server; it's an object with arrays of JSON strings.
	N.buildContent = function(aggregator) {
		
		var j,
			dateSort = function(a, b) {
				return parseInt(a.name.replace(/\w+\-/, ''), 10) -
					Date.parse(b.name.replace(/\w+\-/, ''));
			};
		
		// For each property of the aggregator (i.e. each type of content), and
		// for each of the indexes of the array of JSON strings inside that
		// property, parse the string into an object.
		for (j in aggregator) {
			if (aggregator.hasOwnProperty(j)) {
				
				for (i = 0, len = aggregator[j].content.length; i < len; i++) {
					aggregator[j].content[i] = JSON.parse(aggregator[j].content[i]);
				}
				
				// Sort the array of our content objects based on the name/count; that
				// is to say, the index of when the content was created.
				aggregator[j].content.sort(dateSort);
				
				// Grab the target element for our content from the template based
				// upon which property of our content aggregator we're parsing.
				targetArea = document.getElementById(j);
				
				// For each of the objects in our content array, build out the
				// appropriate elements for articles in that section. This would be
				// nice to abstrace away into a modular system, allowing modification
				// of the tags being generated with relative ease, especially with
				// regards to the "blurb" bits below.
				for (i = 0, len = aggregator[j].content.length; i < len; i++) {
					
					// Check to see if it is a blurb or not, altering some of the
					// elements created below.
					blurb = aggregator[j].content[i].type === 'blurb' ? true : false;
					
					article = document.createElement('article');
					// To preserve some sanity in header heirarchy, we create an h2 for
					// blurbs, which (for now anyway) are site taglines/descriptions
					// near the first header.
					title = blurb ?
						document.createElement('h2') :
						document.createElement('h3');
					body = document.createElement('div');
					
					// Id the article.
					article.id = aggregator[j].content[i].name;
					
					// Add a class to each of our articles based upon its index name.
					article.className = 'article ' + aggregator[j].content[i].name;
					title.className = 'title';
					body.className = 'body';
					
					targetArea.appendChild(article);
					article.appendChild(title);
					article.appendChild(body);
					
					title.innerHTML = aggregator[j].content[i].title;
					body.innerHTML = aggregator[j].content[i].body;
					
					// If we're not dealing with a blurb, add the content details.
					if (!blurb) {
						details = document.createElement('p');
						details.className = 'details';
						article.appendChild(details);
						
						details.innerHTML = 'Posted by ' +
						aggregator[j].content[i].author +
						' on ' +
						aggregator[j].content[i].date.match(/\d+\/\d+\/\d+/)[0] +
						'.';
					}
				}
			}
		}
		
		// Have we logged in already or not?  Check our state.
		N.checkState();
		
	};
	
}(nooline));

// Add a new user to the system.

(function(N) {
	N.changePassword = function() {
		var section = document.getElementById('control-panel-1').children[0],
			panel = document.createElement('div'),
			category = document.getElementById('users-button'),
			existing = section.querySelectorAll('.control-panel-child'),
			i,
			len,
			closePanel,
			form,
			username,
			old,
			password,
			again,
			message,
			creds = {},
			sendHash = new XMLHttpRequest(),
			sjcl = window.sjcl;
		
		// Remove any existing panels we might have active at the time.
		if (existing.length > 0) {
			for (i = 0, len = existing.length; i < len; i++) {
				section.removeChild(existing[i]);
			}
		}
		
		section.appendChild(panel);
		
		category.className += ' active';
		
		panel.id = 'change-password-panel';
		panel.className = 'control-panel-child change-password-panel animate-all ' +
			'hidden';
		panel.innerHTML =
			'<h1 id="panel-title">Change a user\'s password:</h1>' +
			'<button id="close-panel" class="close-panel button animate-all">' +
				'&times;' +
			'</button>' +
			'<form id="change-password-form" method="POST" ' +
				'action="/change-password">' +
				'<label for="username">Username:' +
					'<input name="username" id="username" type="text"' +
					'class="animate-all" />' +
				'</label>' +
				'<label for="old">Old one:' +
					'<input name="old" id="old" type="password" ' +
					'class="animate-all" />' +
				'</label>' +
				'<label for="password">New one:' +
					'<input name="password" id="password" type="password" ' +
					'class="animate-all" />' +
				'</label>' +
				'<label for="again">And again:' +
					'<input name="again" id="again" type="password" ' +
					'class="animate-all" />' +
				'</label>' +
				'<button id="go-button" class="go-button button animate-all">' +
					'Go!' +
				'</button>' +
			'</form>' +
			'<h2 id="panel-message" class="animate-all">' +
				'Enter the user\'s credentials.' +
			'</h2>';
			
		closePanel = document.getElementById('close-panel');
		form = document.getElementById('change-password-form');
		username = document.getElementById('username');
		old = document.getElementById('old');
		password = document.getElementById('password');
		again = document.getElementById('again');
		message = document.getElementById('panel-message');
				
		window.setTimeout(function() {
			
			panel.className = panel.className.replace(' hidden', '');
			
		}, 5);
		
		form.onsubmit = function(event) {
			var empty = N.checkForEmpty([username, old, password, again]);
			if (!event) {
				event = window.event;
				event.returnValue = false;
			} else {
				event.preventDefault();
			}
			
			if (empty.length > 0) {
				for (i = 0, len = empty.length; i < len; i++) {
					if (!empty[i].className.match(/ input-error/)) {
						empty[i].className = empty[i].className += ' input-error';
					}
						
					empty[i].onblur = function() {
						if (this.value !== '') {
							this.className = this.className
								.replace(' input-error', '');
						}
					}
				}
				
				message.innerHTML = 'No fields are allowed to be blank.';
				message.className = message.className += ' error-message';
			} else if (password.value !== again.value) {
				var checkMatch = function() {
					
					if (password.value === again.value) {
						password.className = password.className.replace(' input-error', '');
						again.className = again.className.replace(' input-error', '');
					}
				}
				
				if (!password.className.match(/ input-error/)) {
					password.className = password.className += ' input-error';
				}
				
				if (!again.className.match(/ input-error/)) {
					again.className = again.className += ' input-error';
				}
				
				password.onblur = checkMatch;
				again.onblur = checkMatch;
				
				message.innerHTML = 'These fields must exactly match.';
				message.className = message.className += ' error-message';
			} else {
				
				creds.username = username.value;
				creds.old = sjcl.encrypt(old.value, old.value);
				creds.password = sjcl.encrypt(old.value, password.value);
				creds.auth = {};
				creds.auth.username = N.user;
				creds.auth.password = N.password;
				
				if (message.className.match(/ error-message/)) {
					message.className = message.className.replace(' error-message', '');
				}
				
				message.innerHTML = 'Working...';
				
				sendHash.open('POST', '/change-password', false);
				sendHash.setRequestHeader('Content-Type', 'text/plain');
				sendHash.onreadystatechange = function(event) {
					
					if (sendHash.readyState === 4) {
						
						switch (sendHash.status) {
							case 200:
								
								if (sendHash.responseText !== 'invalid') {
									username.value = '';
									old.value = '';
									password.value = '';
									again.value = '';
									message.innerHTML = 'Success!  Change another password?';
								} else {
									message.innerHTML = 'You don\'t have permission anymore.';
									message.className = message.className += ' error-message';
								}
								break;
							case 404:
								
								message.innerHTML = 'Oops!  No such user exists.';
								message.className = message.className += ' error-message';
								break;
							case 401:
								
								message.innerHTML = 'Yikes!  That old password is wrong.';
								message.className = message.className += ' error-message';
								break;
							case 403:
								
								message.innerHTML = '*Your* username doesn\'t exist.  Hacking?';
								message.className = message.className += ' error-message';
								break;
						}
						
					}
					
				};
				sendHash.send(JSON.stringify(creds));
				
			}
		};
		
		closePanel.onclick = function(event) {
			
			N.removeElement(panel);
			category.className = category.className.replace(' active', '');
		};
		
	};
}(nooline));

// Checks for content in an unsaved content entry form, such as when adding a
// new piece of content, and returns whether it found anything unsaved or not.
// Usually called when canceling the creation of new content.

(function(N) {
	
	N.checkForContent = function(element) {
		var i,
			len,
			// Grab all of the user-editable fields.
			kids = element.parentNode.querySelectorAll('.userinput'),
			unsaved;
			
		// Check to see if they have any values; breaking out if any one of them
		// does.
		for (i = 0, len = kids.length; i < len; i++) {
			if (kids[i].value === '') {
				unsaved = false;
			} else {
				unsaved = true;
				break;
			}
		}
		return unsaved;
	};
}(nooline));

// Checks to see if any of the form fields in a content entry form are empty.
// Usually called when entering new content, to ensure that the content has
// *something* in it.

(function(N) {
	
  N.checkForEmpty = function(nodeArray) {
		var i,
			len,
			emptyNodes = [];
			
		// For each of the elements in the array of nodes passed, check to see if
		// they are empty, or if they already have the 'input-error' class name. If
		// either is true, push them to the emptyNodes array, and return it.
		for (i = 0, len = nodeArray.length; i < len; i++) {
			if ((nodeArray[i].value === '') ||
					(/input-error/.test(nodeArray[i].className))) {
				emptyNodes.push(nodeArray[i]);
			}
		}
		
		return emptyNodes;
	};
}(nooline));

// Check to see if we've logged in already or not.

(function(N) {
	
	N.checkState = function() {
		// Test to see if our credentials are in the cookie.
		var hashCheck = /hash=\|.+\|hash/.test(document.cookie),
			username = /user=\|.+\|user/.test(document.cookie);
		
		// If they are, grab out the value, and pass 'em to the getCreds method.
		if (username && hashCheck) {
			hashCheck = document.cookie.match(/hash=\|.+\|hash/)[0];
			username = document.cookie.match(/user=\|.+\|user/)[0];
			
			hashCheck = hashCheck.replace('hash=|', '');
			hashCheck = hashCheck.replace('|hash', '');
			username = username.replace('user=|', '');
			username = username.replace('|user', '');
			
			N.getCreds(username, hashCheck, true);
		}
		
	};
}(nooline));

// Closes thatever form field is associated with the "close button" clicked.
//
// Need to clean up this file, referencing elements more cleanly, and using
// getElementById.

(function(N) {
	
	// Catch for old IE, which doesn't support event.preventDefault.
	N.closeThis = function(event) {
		if (!event) {
			event = window.event;
			event.returnValue = false;
		} else {
			event.preventDefault();
		}
			
		
		var self = this,
			i,
			len,
			sure,
			// The form element itself.
			parent = self.parentNode,
			// The name of the content piece we're editing, i.e. blog-5.
			name = parent.parentNode.parentNode.id,
			// The type of content we're editing, and the section in the template.
			contentArea = self.parentNode.parentNode.parentNode,
			// The article itself in which the form element lives.
			article = self.parentNode.parentNode,
			// Current title and body of the content, if any. Should switch this to
			// getElemenyById.
			currentTitle = parent.parentNode.querySelectorAll('.title')[0],
			currentBody = parent.parentNode.querySelectorAll('.body')[0],
			newTitle,
			newBody,
			content = [];
		
		// If it's the login form we're removing, just yank it right out.
		if (self.parentNode.id === 'login-form') {
			
			N.removeElement(self.parentNode);
			
		// Otherwise, if existing content has been edited, verify that the user
		// wants to abandon them, and add back our content editing buttons.
		//
		// This part needs to be cleaned up some.
		} else if (self.className.match('edit-controls')) {
			
			newTitle = parent.querySelectorAll('.title')[0];
			newBody = parent.querySelectorAll('.body')[0];
			
			content.push(parent.parentNode.querySelectorAll('.edit-post')[0],
				parent.parentNode.querySelectorAll('.title')[0],
				parent.parentNode.querySelectorAll('.body')[0]);
			
			if (name !== 'blurb') {
				content.push(parent.parentNode.querySelectorAll('.details')[0]);
			}
			
			// Check to see if the content has changed.
			if ((newTitle.value !== currentTitle.innerHTML) ||
					newBody.value !== currentBody.innerHTML) {
				
				sure = window.confirm('You\'ve made some changes to this content.  ' +
					'Are you sure you want to abandon them?');
				
				if (sure) {
					N.removeElement(parent);
					
					parent.parentNode.className =
						parent.parentNode.className.replace(' editing', '');
					
					for (i = 0, len = content.length; i < len; i++) {
						content[i].style.display = '';
					}
					
					window.setTimeout(function() {
						for (i = 0, len = content.length; i < len; i++) {
							content[i].style.opacity = '';
						}
						if (contentArea.className.match('addable')) {
							
							N.createAddContentButton(contentArea);
						}
					}, 250);
				}
				
			// If no content has been changed from what was being edited, just remove
			// the fields.
			} else {
				N.removeElement(parent);
				
				parent.parentNode.className =
					parent.parentNode.className.replace(' editing', '');
				
				for (i = 0, len = content.length; i < len; i++) {
					content[i].style.display = '';
				}
				
				window.setTimeout(function() {
					for (i = 0, len = content.length; i < len; i++) {
						content[i].style.opacity = '';
					}
					
					if (contentArea.className.match('addable')) {
						
						N.createAddContentButton(contentArea);
					}
				}, 250);
			}
			
		// If existing content isn't being edited, check to see if new content is
		// being added. If it is, confirm that it will be abandoned.
		} else if (N.checkForContent(self)) {
			
			sure = window.confirm('You have unsaved content.  ' +
				'Are you sure you want to abadon this new post?');
			
			if (sure) {
				window.setTimeout(function() {
					if (contentArea.className.match('addable')) {
						
						N.createAddContentButton(contentArea);
					}
					
					N.removeElement(article);
				}, 250);
			}
			
		// If nothing has changed, and no new content has been added, just remove
		// the form.
		} else if (N.validCreds) {
		
			N.createAddContentButton(contentArea);
			N.removeElement(article);
		}
		
	};
}(nooline));

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

// Create and add the button for adding more content.

(function(N) {
	N.createControlPanel = function() {
		var panel = document.createElement('div'),
			container = document.getElementById('container'),
			i,
			len,
			buttons = [],
			addUser,
			removeUser,
			usersButton,
			subnav,
			changePassword;
		
		document.body.insertBefore(panel, document.body.children[0]);
		// Panel starts out with the "hidden" class, and opacity of 0...
		// (See note 1.)
		panel.className = 'control-panel-1 control-panel-wrapper animate-all ' +
			'hidden';
		panel.id = 'control-panel-1';
		panel.innerHTML =
			'<section id="control-panel-inner" class="control-panel-inner ' +
				'animate-all">' +
				'<ul id="control-panel-1-nav" class="control-panel-nav">' +
					'<li>' +
						'<button id="users-button" class="users-button nav-top hidden animate-all">' +
							'Users' +
						'</button>' +
						'<ul class="control-panel-subnav">' +
							'<li>' +
								'<button id="add-user" class="nav-second animate-all">' +
									'Add User' +
								'</button>' +
							'</li>' +
							'<li>' +
								'<button id="remove-user" class="nav-second animate-all">' +
									'Remove User' +
								'</button>' +
							'</li>' +
							'<li>' +
								'<button id="change-password" class="nav-second animate-all">' +
									'Change Password' +
								'</button>' +
							'</li>' +
						'</ul>' +
					'</li>' +
				'</ul>' +
			'</section>';
		
		container.className = container.className += ' logged-in';
		
		usersButton = document.getElementById('users-button');
		addUser = document.getElementById('add-user');
		removeUser = document.getElementById('remove-user');
		changePassword = document.getElementById('change-password');
		
		addUser.onclick = N.addUser;
		removeUser.onclick = N.removeUser;
		changePassword.onclick = N.changePassword;
		
		usersButton.onfocus = function() {
			subnav = usersButton.nextElementSibling.querySelectorAll('.nav-second');
			usersButton.nextElementSibling.style.display = 'block';
			
			for (i = 0, len = subnav.length; i < len; i++) {
				subnav[i].onblur = function() {
					var onSubnav;
					
					// When using keyboard navigation, the focus goes to the document body
					// before registering on the next element as might be expected. By
					// building in a micro-delay, we'll catch when the browser registers
					// the focus event on the element properly.
					window.setTimeout(function() {
						
						for (i = 0, len = subnav.length; i < len; i++) {
							if (document.activeElement === subnav[i]) {
								onSubnav = true;
								
								break;
							}
						}
						
						if ((!onSubnav) &&
								(document.activeElement !== usersButton)){
							usersButton.nextElementSibling.style.display = '';
						}
						
					});
					
				};
			}
		};
		
		usersButton.onblur = function() {
			// See above statement about timeouts and window focus.
			window.setTimeout(function() {
				var onSubnav;
				
				for (i = 0, len = subnav.length;
						 i < len;
						 i++) {
					
					if (document.activeElement === subnav[i]) {
						onSubnav = true;
						
						break;
					} else {
						usersButton.nextElementSibling.style.display = '';
					}
				}
			}, 5);
		};
		
		// (Note 1:)
		// ...Which we remove very quickly, and set the opacity to 1,
		// which allows for CSS transitions to animate. Without this delay, the
		// transition doesn't animate properly – it appears to fire too soon,
		// causing the element to just appear suddenly.
		window.setTimeout(function() {
			
			panel.className = panel.className.replace(' hidden', '');
			buttons = panel.querySelectorAll('.nav-top');
			
			for (i = 0, len = buttons.length; i < len; i++) {
				
				buttons[i].className = buttons[i].className.replace(' hidden', '');
			}
		}, 100);
	};
}(nooline));

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

// Create the login form; the point of entry adding content to a site.

(function(N) {
	N.createLoginForm = function(event) {
		// When the login link is clicked, prevent default behaviour.  Catch for IE.
		if (!event) {
			event = window.event;
			event.returnValue = false;
		} else {
			event.preventDefault();
		}
		
		var loginForm,
			closeButton;
			
		// Make sure there isn't already a login form on the page.
		if (document.getElementById('login-form') === null) {
			// If there isn't, create one, along with the appropriate fields.
			loginForm = document.createElement('form');

			loginForm.id = 'login-form';
			loginForm.action = '/login';
			loginForm.method = 'POST';
			loginForm.className = 'animate-all hidden';
			loginForm.innerHTML = '<label for="username">Username:</label>' +
				'<input type="text" id="username" ' +
				'class="animate-all" name="username" />' +
				'<label for="password">Password:</label>' +
				'<input type="password" id="password" ' +
				'class="animate-all" name="password" />' +
				'<input type="submit" class="animate-all" ' +
				'value="Login" />' +
				'<button class="close-button animate-all" ' +
				'title="Close Login Form">&times;</button>';
				
			// Add the form to the site header, and assign our ecent listener.
			N.header.appendChild(loginForm);
			closeButton = loginForm.querySelectorAll('.close-button')[0];
			closeButton.onclick = N.closeThis;
			
			// Get the original z-index of the form, catching for IE.
			// 
			// Looks like this can probably be removed – older implementation which
			// wasn't chosen.
			N.originalZ = window.getComputedStyle ?
				window.getComputedStyle(loginForm, null).getPropertyValue('z-index') :
				loginForm.currentStyle.zIndex;
				
			// Call our custom submit method when we login.
			loginForm.onsubmit = N.submitLogin;
			
			// To allow CSS transitions to fire properly, we need to add a delay to
			// when we remove CSS properties keeping them hidden, otherwise they fire
			// before the element is ready to be animated.
			window.setTimeout(function() {
				loginForm.className = loginForm.className.replace(' hidden', '');
				loginForm.style.opacity = 1;
			}, 5);
			
		// If the login form already does exist on the page, flash it at the user to
		// let them know.
		} else {
			
			loginForm = document.getElementById('login-form');
			loginForm.style.borderColor = '#f00';
			loginForm.style.background = '#f0c';

			window.setTimeout(function() {
				loginForm.style.borderColor = '';
				loginForm.style.background = '';
			}, 250);
		}
	};
}(nooline));

// Creates the form for adding a new post, typically called by the "add content"
// button.
//
// Need to implement an "options" button.

(function(N) {
	N.createPostForm = function(event) {
		// Standard prevent default w/ catch for IE.
		if (!event) {
			event = window.event;
			event.returnValue = false;
		} else {
			event.preventDefault();
		}
		
		var self = this,
			closeButton,
			//optionsButton,
			saveButton,
			// Grab the name of the content area in which we're working, to determine
			// type.
			name = self.parentNode.id,
			inputs,
			form,
			i,
			len,
			newPost = document.createElement('article'),
			// Next most recent content piece before then one we're making.
			mostRecentSibling;
			
		// Build out our new post form.
		newPost.className = 'new-post animate-all hidden';
		newPost.innerHTML = '<form id="add-' + name +'-post-form"' +
				'action="/post" method="POST" class="animate-all post-form">' +
			'<button id="close-' + name + '-form"' +
				'class="animate-all close-new-post new-post-controls" ' +
				'title="Cancel New Post">&times;</button>' +
			'<button id="save-' + name + '-post"' +
				'class="animate-all save-new-post new-post-controls" ' +
				'title="Save Post">Save</button>' +
			'<label for="' + name + '-post-title">Post Title:' + '</label>' +
			'<input id="' + name + '-post-title" name="' + name + '-post-title" ' +
				'class="animate-all userinput title" type="text" />' +
			'<label for="' + name + '-post-body">Post Content:</label>' +
			'<textarea id="' + name + '-post-body" class="animate-all ' +
				'body userinput"></textarea>' +
			'</form>';
			
		// If we have multiple content pieces, increment the number by 1.
		//
		// Probably should refactor to label as 1 if it's the only content piece.
		if (self.parentNode.children.length > 1) {
			mostRecentSibling = self.nextSibling;
			newPost.className += ' ' + name + '-' + (parseInt(
				mostRecentSibling.className
					.match(new RegExp(name + '-' + '\\d+'))[0]
					.split('-')[1]
				, 10) + 1);
		}
		
		// Insert at top of list.
		self.parentNode.insertBefore(newPost, self.parentNode.children[1]);
		
		// Grab all the possible user input fields in our new form.
		inputs = self.parentNode.querySelectorAll('.userinput');

		// Should change this to a getElementById
		form = newPost.querySelectorAll('.post-form')[0];
		
		// This all happens async, so we don't actually use the form to post.
		form.onsubmit = function(event) {
			if (!event) {
				event = window.event;
				event.returnValue = false;
			} else {
				event.preventDefault();
			}
		};
		
		// Remove the add content button while we're adding content already.
		N.removeElement(self);
		
		// Get form controls and assign listeners.
		closeButton = document.getElementById('close-' + name + '-form');
		closeButton.onclick = N.closeThis;
		//Options Button Event Listener Goes Here
		saveButton = document.getElementById('save-' + name + '-post');
		saveButton.onclick = N.saveThis;
		
		// On focus of the form elements, check to see if our input errors are
		// resolved.
		for (i = 0, len = inputs.length; i < len; i++) {
			inputs[i].onfocus = N.errorCheck;
		}
		
		// Set our timeout to let CSS transitions fire after the element is ready to
		// be animated.
		window.setTimeout(function() {
			
			newPost.className = newPost.className.replace(' hidden', '');
			// Adding a second delay to the opacity animation is a little easier on
			// the browser, even when the GPU is initialized. This part should be
			// cleaned up some, to not need extraneous style accomodations like this.
			window.setTimeout(function() {
				newPost.style.opacity = 1;
			}, 250);
		}, 5);
	};
}(nooline));

// Edit an existing form, typically called from an "edit" button on a piece of
// content.

(function(N) {
	
	N.editThis = function() {
		var self = this,
			parent = self.parentNode,
			name = parent.parentNode.id,
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
			updateButton,
			removeButton;
		
		// If the first piece of content is being edited, remove the "add new"
		// button while it's being edited.
		if (parent === parent.parentNode.children[1]) {
			N.removeElement(addNewPostButton);
		}
		
		form.className = 'animate-all post-form';
		form.style.opacity = 0;
		form.style.position = 'absolute';
		form.innerHTML ='<button class="button edit-controls animate-all ' +
			'close-edit-post">&times;</button>' +
			'<button class="button edit-controls animate-all update-edit-post">' +
				'Update</button>' +
			'<button class="button edit-controls animate-all edit-post-remove">' +
				'Remove</button>' +
			'<input type="text" class="animate-all userinput title" />' +
			'<textarea class="animate-all userinput body"></textarea>';
		
		form.onsubmit = function(event) {
			if (!event) {
				event = window.event;
				event.returnValue = false;
			} else {
				event.preventDefault();
			}
		};
		
		
		// Grab the new form fields...
		//
		// (Need to change this to getElementById)
		newTitle = form.querySelectorAll('.title')[0];
		newBody = form.querySelectorAll('.body')[0];
		// ...And set their values to the current ones.
		newTitle.value = currentTitle.innerHTML;
		newBody.value = currentBody.innerHTML;
		
		// Set the height of the form fields to the height of the current content.
		//
		// Need to change the font, also.
		newTitle.style.height = currentTitle.offsetHeight + 'px';
		newBody.style.height = currentBody.offsetHeight + 'px';
		
		parent.className += ' editing';
		
		// Change this to getElementById.
		closeButton = form.querySelectorAll('.close-edit-post')[0];
		updateButton = form.querySelectorAll('.update-edit-post')[0];
		removeButton = form.querySelectorAll('.edit-post-remove')[0];
		
		// Set our event listeners.
		closeButton.onclick = N.closeThis;
		updateButton.onclick = N.updateThis;
		removeButton.onclick = N.removeContent;
		
		// Push all the content to an array, which we'll hide.
		//
		// Need to switch this to getElementById.
		content.push(self,
			parent.querySelectorAll('.title')[0],
			parent.querySelectorAll('.body')[0]);
		
		// Blurbs don't get the details right now.
		if (name !== 'blurb') {
			
			content.push(parent.querySelectorAll('.details')[0]);
		
		}
		
		// Notes need to have a width set, too. Need to abstract this to a class in
		// the template.
		if (name === 'notes') {
			newTitle.style.width = currentTitle.offsetWidth + 'px';
			newBody.style.width = currentBody.offsetWidth + 'px';
		}
		
		// Add the animation helper class to the content. This should be a plugin
		// someday.
		for (i = 0, len = content.length; i < len; i++) {
			if (!content[i].className.match(' animate-all')) {
				content[i].className += ' animate-all';
			}
			content[i].style.opacity = 0;
		}
		
		// Hide the content after it isn't visible anymore, and then show the form.
		window.setTimeout(function() {
			for (i = 0, len = content.length; i < len; i++) {
				content[i].style.display = 'none';
			}
			form.style.opacity = '';
			form.style.position = '';
			
		}, 500);
		
		// Add the form to the article parent.
		parent.appendChild(form);
		
	};
	
}(nooline));

// Checks to see if there is an error in the input field previously. If there
// is, replaces the value of the input field with an empty string, removes the
// class, and lets the user try again.

(function(N) {
	N.errorCheck = function() {
		var self = this;
		
		if (/input-error/.test(self.className)) {
			self.value = '';
			self.className = self.className.replace(' input-error', '');
		}
	};
}(nooline));

// Our inital grab of content from the server. Currently uses AJAX; on the list
// is to implement sockets where applicable.

(function(N) {
	
	N.getContent = function() {
		
		// Some counters for our loops.
		var i,
			prop,
			len,
			// Regex to grab out of the template what we're looking for.
			count = /count-\d+/,
			digits = /\d+/,
			howMany,
			whatKind,
			getPosts = new XMLHttpRequest(),
			// We use an object to batch up our requests to the server, which it
			// populates, and sends back.
			aggregator = {};
		
		// Grab all of the content areas in our template.
		N.contentAreas = document.querySelectorAll('.content');
		
		// For each of the content areas, we create a child object named the same,
		// along with another child object for how many content pieces it expects.
		for (i = 0, len = N.contentAreas.length; i < len; i++) {
			howMany = parseInt(digits.exec(N.contentAreas[i].className
				.match(count)[0])[0], 10);
			whatKind = N.contentAreas[i].id;
			
			aggregator[whatKind] = {};
			
			aggregator[whatKind].howMany = howMany;
			
		}
		
			
		// Our request to the server.
		getPosts.open('POST', '/get-content', true);
		getPosts.setRequestHeader('Content-Type', 'text/plain');
		
		getPosts.onreadystatechange = function() {
			
			if ((getPosts.readyState === 4) &&
					(getPosts.status === 200)) {
				// When the server responds with our object, we parse the JSON and
				// build out the content.
				N.buildContent(JSON.parse(getPosts.responseText));
				
			}
			
		};
		
		getPosts.send(JSON.stringify(aggregator));
		
	};

}(nooline));

// Checks to see if the creds we have match for a user on the server, and if
// they're valid or not.
//
// Currently uses the Stanford JavaScript Crypto Library (sjcl) for decryption:
// http://crypto.stanford.edu/sjcl/

(function(N) {
	N.getCreds = function(username, password, persist) {
		var hash,
			decrypted,
			getHash = new XMLHttpRequest(),
			sjcl = window.sjcl,
			hash,
			creds = {};
		
		creds.username = username;
		if (!persist) {
		 creds.password = sjcl.encrypt(password, password);
		} else {
			creds.password = password;
		}
		
		// Send the username to the server, which responds with a hash for the
		// username, if it has one. If not, it'll respond with a 404, which means
		// the username doesn't exist.
		getHash.open('POST', '/login', false);
		getHash.setRequestHeader('Content-Type', 'text/plain');
		getHash.onreadystatechange = function(event) {

			if ((getHash.readyState === 4) && (getHash.status === 200)) {

				hash = getHash.responseText;
				
				// If the username exists, let's try to decrypt it.
				if (hash === 'none') {
					
					alert('We\'re unable to find that user.');
				} else if (hash === 'invalid') {
					
					alert('Wrong password.');
				} else {
					
					N.login();
					
					// Set our cookie for tracking session authentication.
					document.cookie = 'user=|' + creds.username + '|user;';
					document.cookie = 'hash=|' + creds.password + '|hash;';
					
					N.user = creds.username;
					N.password = creds.password;
				}
					
			}
		};
		getHash.send(JSON.stringify(creds));
	};
}(nooline));

// Returns the type of the element passed to it, based upon the id associated
// with it. Typically called from a content-editing form to let the user know
// that a field cannot be blank.

(function(N) {
	N.getInputType = function(element) {
		
		var type = element.id.split('-')[element.id.split('-').length - 1];
			
		return type;
		
	};
}(nooline));

// This is the bulk of our login functionality, which provides all of the
// widgets for us to use when we login.
//
// Need to add a preventative measure to keep this from being used from the
// console; a check against the login should do, perhaps when the content is
// posted.

(function(N) {
	N.login = function() {
		// Grab all the content areas we'll be making editable.
		var contentAreas = document.querySelectorAll('.editable'),
			i,
			k,
			len,
			lon,
			// There should be only one of these; need to make this a getElementById
			loginMeta = document.querySelectorAll('.login')[0],
			logoutLink,
			sjcl = window.sjcl;
		
		// When we login, remove the login form.
		N.removeElement(document.getElementById('login-form'));
		
		// To allow for CSS3 transitions, we set the opacity to 0, since display:
		// none doesn't animate at this time. Then, after a quarter-second, we
		// change the text and set it back.
		loginMeta.style.opacity = 0;
		window.setTimeout(function() {
			loginMeta.innerHTML = 'You are logged in.  Click here to ' +
			'<a id="logout-link" class="animate-color" href="/logout">logout</a>.';
			loginMeta.style.opacity = 1;
			
			logoutLink = document.getElementById('logout-link');
			logoutLink.onclick = N.logout;
		}, 250);
		
		// Need to change this to store the hash, very likely. See note at
		// beginning.
		N.validCreds = true;
		
		// Add buttons for creating and editing content on each of the content
		// areas.
		for (i = 0, len = contentAreas.length; i < len; i++) {
			// If we've made the content area "addable" in the template, add the
			// button.
			if (contentAreas[i].className.match('addable')) {
				N.createAddContentButton(contentAreas[i]);
			}
			
			// Each content piece is editable, and gets an edit button appropriately.
			for (k = 0, lon = contentAreas[i].children.length; k < lon; k++) {
				
				if (contentAreas[i].className.match('editable')) {
				
					if (contentAreas[i].children[k].className.match('article')) {
						N.createEditContentButton(contentAreas[i].children[k]);
					}
				}
				
			}
		}
		
		// Add the control panel to the page to allow for admin tasks.
		N.createControlPanel();
		
	};
}(nooline));

// Logout current user when the logout button is clicked.

(function(N) {
	N.logout = function(event) {
		// Prevent our default behavior with a catch for IE.
		if (!event) {
			event = window.event;
			event.returnValue = false;
		} else {
			event.preventDefault();
		}
		
		// Gather all the content areas, add-post buttons, edit-post buttons, and
		// posts in progress.
		var contentAreas = document.querySelectorAll('.content'),
			addPostButtons = document.querySelectorAll('.add-post'),
			editPostButtons = document.querySelectorAll('.edit-post'),
			// Need to change this to getElementById
			loginMeta = document.querySelectorAll('.login')[0],
			openPosts = document.querySelectorAll('.new-post'),
			controlPanel = document.getElementById('control-panel-1'),
			container = document.getElementById('container'),
			loginLink,
			i,
			len;
					
		// Expire the cookie creds.
		document.cookie = 'user=null;expires=Thu, 01-Jan-70 00:00:01 GMT';
		document.cookie = 'hash=null;expires=Thu, 01-Jan-70 00:00:01 GMT';
		// Need to refactor this – see login.js for details.
		N.validCreds = false;
		
		// Remove each of the elements gathered.
		for (i = 0, len = addPostButtons.length; i < len; i++) {
			N.removeElement(addPostButtons[i]);
		}
		
		for (i = 0, len = editPostButtons.length; i < len; i++) {
			N.removeElement(editPostButtons[i]);
		}
		
		for (i = 0, len = openPosts.length; i < len; i++) {
			N.removeElement(openPosts[i]);
		}
		
		N.removeElement(controlPanel);
		container.className = container.className.replace(' logged-in', '');
		
		// Hide the login meta field, so that it can be animated with CSS
		// transitions if desired.
		loginMeta.style.opacity = 0;
		// When the animation has completed (presumably) change the meta to allow
		// logging in.
		window.setTimeout(function() {
			loginMeta.innerHTML = 'Click here to ' +
			'<a id="login-link" class="animate-color" href="/login">login</a>.';
			loginMeta.style.opacity = 1;
			
			loginLink = document.getElementById('login-link');
			loginLink.onclick = N.createLoginForm;
		}, 250);
	};
}(nooline));

// Publish a specific piece of content.

(function(N){
	
	N.publishContent = function(name) {
		var publishContent = new XMLHttpRequest();
		
		publishContent.open('POST', '/publish-content', true);
		publishContent.setRequestHeader('Content-Type', 'text/plain');
		publishContent.send(name);
		
	};
	
}(nooline));

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

// Removes an element passed to it from the DOM. Usually called from a close
// button on a form.

(function(N) {
	N.removeElement = function(element) {
		
		// Recursive loop checks to see if the element still exists on the page or
		// if it's been removed.
		if (element) {
			
			// Grab the parent element, and set an interval to check on the opacity
			// and height (the "hidden" class uses height) of the element, waiting to
			// remove the element until both have reached 0.
			var parent = element.parentNode,
				interval = window.setInterval(function() {
					
					var opacity = window.getComputedStyle ?
						window.getComputedStyle(element, null).getPropertyValue('opacity') :
						element.currentStyle.opacity,
						
						height = window.getComputedStyle ?
						window.getComputedStyle(element, null).getPropertyValue('height') :
						element.currentStyle.height;
					
					if (opacity === '0') {
						if (height === '0px') {
							
							parent.removeChild(element);
							window.clearInterval(interval);
							
						}
					}
				}, 250);
				
			element.style.opacity = 0;
			element.style.minHeight = 0;
			element.className += ' hidden';
		}
		
	};
}(nooline));

// Add a new user to the system.

(function(N) {
	N.removeUser = function() {
		var section = document.getElementById('control-panel-1').children[0],
			panel = document.createElement('div'),
			category = document.getElementById('users-button'),
			existing = section.querySelectorAll('.control-panel-child'),
			i,
			len,
			closePanel,
			form,
			username,
			sure,
			really,
			message,
			creds = {},
			sendHash = new XMLHttpRequest();
		
		// Remove any existing panels we might have active at the time.
		if (existing.length > 0) {
			for (i = 0, len = existing.length; i < len; i++) {
				section.removeChild(existing[i]);
			}
		}
		
		section.appendChild(panel);
		
		category.className += ' active';
		
		panel.id = 'remove-user-panel';
		panel.className = 'control-panel-child remove-user-panel animate-all hidden';
		panel.innerHTML =
			'<h1 id="panel-title">Remove an existing user:</h1>' +
			'<button id="close-panel" class="close-panel button animate-all">' +
				'&times;' +
			'</button>' +
			'<form id="remove-user-form" method="POST" action="/remove-user">' +
				'<label for="username">Username:' +
					'<input name="username" id="username" type="text"' +
					'class="animate-all" />' +
				'</label>' +
				'<label for="sure">Sure?' +
					'<input name="sure" id="sure" type="checkbox" ' +
					'class="animate-all" />' +
				'</label>' +
				'<label for="really">Really sure?' +
					'<input name="really" id="really" type="checkbox" ' +
					'class="animate-all" />' +
				'</label>' +
				'<button id="go-button" class="go-button button animate-all">' +
					'Do it!' +
				'</button>' +
			'</form>' +
			'<h2 id="panel-message" class="animate-all">' +
				'Enter the username, and confirm.' +
			'</h2>';
			
		closePanel = document.getElementById('close-panel');
		form = document.getElementById('remove-user-form');
		username = document.getElementById('username');
		sure = document.getElementById('sure');
		really = document.getElementById('really');
		message = document.getElementById('panel-message');
				
		window.setTimeout(function() {
			
			panel.className = panel.className.replace(' hidden', '');
			
		}, 5);
		
		form.onsubmit = function(event) {
			var empty = N.checkForEmpty([username]);
			if (!event) {
				event = window.event;
				event.returnValue = false;
			} else {
				event.preventDefault();
			}
			
			if (empty.length > 0) {
				for (i = 0, len = empty.length; i < len; i++) {
					if (!empty[i].className.match(/ input-error/)) {
						empty[i].className = empty[i].className += ' input-error';
					}
						
					empty[i].onblur = function() {
						if (this.value !== '') {
							this.className = this.className
								.replace(' input-error', '');
						}
					}
				}
				
				message.innerHTML = 'This field can\'t be blank.';
				message.className = message.className += ' error-message';
			} else if ((!sure.checked) ||
								 !(really.checked)) {
				var checkMatch = function() {
					
					if (this.checked) {
						this.className = this.className.replace(' input-error', '');
					}
				}
				
				if (!sure.className.match(/ input-error/)) {
					sure.className = sure.className += ' input-error';
				}
				
				if (!really.className.match(/ input-error/)) {
					really.className = really.className += ' input-error';
				}
				
				sure.onblur = checkMatch;
				really.onblur = checkMatch;
				
				message.innerHTML = 'Not gonna do it if you\'re not sure!';
				message.className = message.className += ' error-message';
			} else {
				
				creds.username = username.value;
				creds.sure = sure.checked;
				creds.really = sure.checked;
				creds.auth = {};
				creds.auth.username = N.user;
				creds.auth.password = N.password;
				
				if (message.className.match(/ error-message/)) {
					message.className = message.className.replace(' error-message', '');
				}
				
				message.innerHTML = 'Working...';
				
				sendHash.open('POST', '/remove-user', false);
				sendHash.setRequestHeader('Content-Type', 'text/plain');
				sendHash.onreadystatechange = function(event) {
					
					if (sendHash.readyState === 4) {
						
						switch (sendHash.status) {
							case 200:
								
								if (sendHash.responseText !== 'invalid') {
									username.value = '';
									sure.checked = false;
									really.checked = false;
									message.innerHTML = 'Success!  Remove another user?';
								} else {
									message.innerHTML = 'You don\'t have permission anymore.';
									message.className = message.className += ' error-message';
								}
								break;
							case 404:
								
								message.innerHTML = 'Oops!  No such user exists.';
								message.className = message.className += ' error-message';
								break;
							case 403:
								
								message.innerHTML = '*Your* username doesn\'t exist.  Hacking?';
								message.className = message.className += ' error-message';
								break;
						}
						
					}
					
				};
				sendHash.send(JSON.stringify(creds));
				
			}
		};
		
		closePanel.onclick = function(event) {
			
			N.removeElement(panel);
			category.className = category.className.replace(' active', '');
		};
		
	};
}(nooline));

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

// Responsible for 

(function(N) {
	N.submitLogin = function(event) {
		// Standard prevent default with catch for older IE.
		if (!event) {
			event = window.event;
			event.returnValue = false;
		} else {
			event.preventDefault();
		}
		
		// Grab the form field values.
		var self = this,
			username = self.elements.username.value,
			password = self.elements.password.value;
			
		// Pass them to the authentication mechanism.
		N.getCreds(username, password);
	};
}(nooline));

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
}(window.nooline));
