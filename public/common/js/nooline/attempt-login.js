
!(function buildAttemptLogin (N) {
  
  N.attemptLogin = function attemptLogin (e) {
    var $this = $(e.target);
    var username = $this.siblings('.username').val();
    var password = $this.siblings('.password').val();
    
    var valid = N.validate({
      username: username,
      password: password
    });
    
    if (!valid) {
      
      N.rejectLogin($this.parents('.login'));
      
    } else {
      
      N.submitCreds(username, password);
      
    }
    
  };
  
}(window.Nooline));