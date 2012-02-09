// Checks to see if there is an error in the input field previously. If there
// is, replaces the value of the input field with an empty string, removes the
// class, and lets the user try again.

(function(N) {
	N.errorCheck = function() {
		var self = this;
		
		if (/input-error/.test(self.className)) {
			self.value = '';
			self.className = self.className.replace(' input-error', '');
		}
	};
}(nooline));