// Publish a specific piece of content.

(function(N){
	
	N.publishContent = function(name) {
		var publishContent = new XMLHttpRequest();
		
		publishContent.open('POST', '/publish-content', true);
		publishContent.setRequestHeader('Content-Type', 'text/plain');
		publishContent.send(name);
		
	};
	
}(nooline));