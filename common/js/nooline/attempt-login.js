
;(function buildAttemptLogin (N) {
  
  var lastLoginAttempt;
  var timediff;

  N.attemptLogin = function attemptLogin (e) {
    var $this = $(e.target);
    var username = $this.siblings('.username').val();
    var password = $this.siblings('.password').val();
    
    var valid = N.validate({
      username: username,
      password: password
    });
    
    N.$activeLogin = $this.parents('.login');
    
    if (!valid) {
      
      N.rejectLogin(N.$activeLogin);
      
    } else {
      
      password = N.hashThis(password);
      
      N.postLogin(username, password, 'initial');
      
    }
    
  };

  if (sessionStorage.lastLoginAttempt) {
    lastLoginAttempt = JSON.parse(sessionStorage.lastLoginAttempt);
    timediff = Date.now() - lastLoginAttempt.timestamp;
  }

  if (timediff < N.settings.EXPIRY) {
    require([
      'nooline/validate',
      'nooline/reject-login',
      'nooline/post-login',
      'nooline/receive-login'
    ], function autoLogin () {

      N.postLogin(lastLoginAttempt.username, 
        lastLoginAttempt.password, 
        'initial');
    });
  }
  
}(window.Nooline));