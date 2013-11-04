
define("common/js/nooline/post-login", function(){
  ;(function buildPostLogin (N) {
    
    N.postLogin = function receiveLogin (username, password, type) {
      
      var lastLoginAttempt = {
        'username': username,
        'password': password,
        timestamp: Date.now()
      };
      
      sessionStorage.setItem(
        'lastLoginAttempt', 
        JSON.stringify(lastLoginAttempt)
      );
      
      console.log('Posting credentials...');
      
      $.post('/login', {
        'username': username,
        'password': password,
        'type': type
      }, N.receiveLogin);
      
    };
    
  }(window.Nooline));
});