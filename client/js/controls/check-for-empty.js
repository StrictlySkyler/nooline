(function(N) {
  N.checkForEmpty = function(nodeArray) {
		var i,
			len,
			emptyNodes = [];
			
		for (i = 0, len = nodeArray.length; i < len; i++) {
			if ((nodeArray[i].value === '') ||
					(/input-error/.test(nodeArray[i].className))) {
				emptyNodes.push(nodeArray[i]);
			}
		}
		
		return emptyNodes;
	};
}(Newline));