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