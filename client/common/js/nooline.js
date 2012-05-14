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