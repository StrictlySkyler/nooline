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