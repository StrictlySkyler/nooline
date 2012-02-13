// Returns the type of the element passed to it, based upon the id associated
// with it. Typically called from a content-editing form to let the user know
// that a field cannot be blank.

(function(N) {
	N.getInputType = function(element) {
		
		var type = element.id.split('-')[element.id.split('-').length - 1];
			
		return type;
		
	};
}(nooline));