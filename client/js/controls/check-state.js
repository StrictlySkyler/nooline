(function(N) {
	N.checkState = function() {
		var hashCheck = /tracker=\|.+\|tracker/.test(document.cookie),
			username = /user=\|.+\|user/.test(document.cookie);
		
		if (username && hashCheck) {
			hashCheck = document.cookie.match(/tracker=\|.+\|tracker/)[0]
			username = document.cookie.match(/user=\|.+\|user/)[0];
				
			hashCheck = hashCheck.replace('tracker=|', '');
			hashCheck = hashCheck.replace('|tracker', '');
			username = username.replace('user=|', '');
			username = username.replace('|user', '');
			
			N.getCreds(username, hashCheck);
		}
		
	};
}(Newline));