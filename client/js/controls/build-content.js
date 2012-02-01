(function(N) {
	
	var i,
		len,
		targetArea,
		article,
		title,
		body,
		details,
		blurb;
	
	N.buildContent = function(aggregator) {
		
		if (!N.runBuildOnce) {

			for (var j in aggregator) {
				if (aggregator.hasOwnProperty(j)) {
					
					for (i = 0, len = aggregator[j].content.length; i < len; i++) {
						aggregator[j].content[i] = JSON.parse(aggregator[j].content[i]);
					}
										
					aggregator[j].content.sort(function(a, b) {
						return parseInt(a.name.replace(/\w+\-/, ''), 10) -
							Date.parse(b.name.replace(/\w+\-/, ''));
					});
					
					targetArea = document.getElementById(j);
					
					for (i = 0, len = aggregator[j].content.length; i < len; i++) {
						blurb = aggregator[j].content[i].type === 'blurb' ? true : false;
						
						article = document.createElement('article');
						title = blurb ?
							document.createElement('h2') :
							document.createElement('h3');
						body = document.createElement('div');
						
						article.className = 'article ' + aggregator[j].content[i].name;
						title.className = 'title';
						body.className = 'body';
						
						targetArea.appendChild(article);
						article.appendChild(title);
						article.appendChild(body);
						
						title.innerHTML = aggregator[j].content[i].title;
						body.innerHTML = aggregator[j].content[i].body;
						
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
			
			N.checkState();
			
		}
		
		N.runBuildOnce = true;
	}
	
}(Newline));