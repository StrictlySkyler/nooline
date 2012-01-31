(function(N) {
	
	N.getContent = function() {
		var i,
			prop,
			len,
			count = /count-\d+/,
			digits = /\d+/,
			howMany,
			whatKind,
			getPosts = new XMLHttpRequest(),
			content,
			aggregator = {};
			
		N.contentAreas = document.querySelectorAll('.content');
		
		for (i = 0, len = N.contentAreas.length; i < len; i++) {
			howMany = parseInt(digits.exec(N.contentAreas[i].className
				.match(count)[0])[0], 10);
			whatKind = N.contentAreas[i].id;
			
			aggregator[whatKind] = {};
			
			aggregator[whatKind].howMany = howMany;
			
		}
		
		getPosts.open('POST', '/get-content', true);
		getPosts.setRequestHeader('Content-Type', 'text/plain');
		
		getPosts.onreadystatechange = function() {
			
			if ((getPosts.readyState === 4) &&
					(getPosts.status === 200)) {
				
				N.buildContent(JSON.parse(getPosts.responseText));
				
			}
			
		};
		
		getPosts.send(JSON.stringify(aggregator, null, '\t'));
		
	};

}(Newline));