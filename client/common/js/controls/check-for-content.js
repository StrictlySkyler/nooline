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