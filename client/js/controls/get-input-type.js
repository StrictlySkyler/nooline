(function(N) {
	N.getInputType = function(element) {
		
		var type = element.id.split('-')[element.id.split('-').length - 1];
			
		return type;
		
	};
}(Newline));