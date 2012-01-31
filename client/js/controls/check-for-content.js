(function(N) {
	N.checkForContent = function(element) {
		var i,
			len,
			kids = element.parentNode.querySelectorAll('.userinput'),
			unsaved;
			
		for (i = 0, len = kids.length; i < len; i++) {
			if (kids[i].value === '') {
				unsaved = false;
			} else {
				unsaved = true;
				break;
			}
		}
		return unsaved;
	}
}(Newline));