(function(N) {
	N.errorCheck = function() {
		var self = this;
		
		if (/input-error/.test(self.className)) {
			self.value = '';
			self.className = self.className.replace(' input-error', '');
		}
	};
}(Newline));