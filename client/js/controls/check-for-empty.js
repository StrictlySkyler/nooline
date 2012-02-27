// Checks to see if any of the form fields in a content entry form are empty.
// Usually called when entering new content, to ensure that the content has
// *something* in it.

(function(N) {
	
  N.checkForEmpty = function(nodeArray) {
		var i,
			len,
			emptyNodes = [];
			
		// For each of the elements in the array of nodes passed, check to see if
		// they are empty, or if they already have the 'input-error' class name. If
		// either is true, push them to the emptyNodes array, and return it.
		for (i = 0, len = nodeArray.length; i < len; i++) {
			if ((nodeArray[i].value === '') ||
					(/input-error/.test(nodeArray[i].className))) {
				emptyNodes.push(nodeArray[i]);
			}
		}
		
		return emptyNodes;
	};
}(nooline));