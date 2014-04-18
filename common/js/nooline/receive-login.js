
define(function () {
  var N = window.Nooline;
    
  /**
   * receiveLogin
   * Deal with login attempt response from server.
   *
   * Either we tell 'em they need to login again, or we load the components
   * needed and let 'em know.
   *
   * @param data  {Object}  Server response object.
   * @return                None.
   */
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
  
});
