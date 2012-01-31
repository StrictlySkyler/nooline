(function(N) {
	N.submitLogin = function(event) {
		event.preventDefault();
		var self = this,
			username = self.elements["username"].value,
			password = self.elements["password"].value;

		N.getCreds(username, password);
	};
}(Newline));