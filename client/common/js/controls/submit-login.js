// Responsible for 

(function(N) {
	N.submitLogin = function(event) {
		// Standard prevent default with catch for older IE.
		if (!event) {
			event = window.event;
			event.returnValue = false;
		} else {
			event.preventDefault();
		}
		
		// Grab the form field values.
		var self = this,
			username = self.elements.username.value,
			password = self.elements.password.value;
			
		// Pass them to the authentication mechanism.
		N.getCreds(username, password);
	};
}(nooline));