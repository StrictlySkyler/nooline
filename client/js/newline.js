var Newline = {};

// Firefox < v4 doens't implement the onreadystatechange event, so we'll build
// in a timer to check for us.
if ((!document.onreadystatechange) &&
		(window.navigator.userAgent.match('Firefox'))) {
	
	var readyCheck = setInterval(function() {
		if (document.readyState === 'complete') {
			clearInterval(readyCheck);
			document.onreadystatechange();
		}
	}, 50);
	
}

document.onreadystatechange = function() {
	if (document.readyState === 'complete') {
		(function(N) {
			var i,
				len,
				legacy,
				riskLink;
				
			N.UA = window.navigator.userAgent;
			legacyClient = ['Firefox/3.6', 'MSIE 7.0', 'MSIE 8.0', 'MSIE 9.0'];
			
			for (i = 0, len = legacyClient.length; i < len; i++) {
				if (N.UA.match(legacyClient[i])) {
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
					riskLink.onclick = function(event) {
						document.body.removeChild(legacy);
					}
				}
			}
			
			N.loginLink = document.getElementById('login-link');
			N.header = document.getElementById('header');
			N.originalZ;
			N.validCreds;
			N.mainNav = document.getElementById('main-nav').children[0];
			
			N.getContent();
			
			N.loginLink.onclick = N.createLoginForm;
			
			N.onNav(N.mainNav, 'moving-out');
		}(Newline));
	}
}