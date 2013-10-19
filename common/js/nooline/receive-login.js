
;(function buildReceiveLogin (N) {
  
  N.receiveLogin = function receiveLogin (data) {
    
    console.log('...Response received.  Status is:', data.status);
    
    if (data.status !== 'success') {
      
      N.rejectLogin(N.$activeLogin);
      
    } else {
      
      require([
        'nooline/build-controls',
        'nooline/logout',
        'nooline/show-login-success',
        'nooline/remove-controls'
      ], function acceptLogin () {

        N.showLoginSuccess(data);

      });
      
      
    }
    
  };
  
}(window.Nooline));