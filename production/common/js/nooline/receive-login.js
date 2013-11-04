
define("common/js/nooline/receive-login", function(){
  ;(function buildReceiveLogin (N) {
    
    N.receiveLogin = function receiveLogin (data) {
      
      console.log('...Response received.  Status is:', data.status);
      
      if (data.status !== 'success') {
        
        N.rejectLogin(N.$activeLogin);
        
      } else {
        
        require([
          'common/js/nooline/build-controls',
          'common/js/nooline/logout',
          'common/js/nooline/show-login-success',
          'common/js/nooline/remove-controls'
        ], function acceptLogin () {

          N.showLoginSuccess(data);

        });
        
        
      }
      
    };
    
  }(window.Nooline));
});