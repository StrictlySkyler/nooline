define('common/js/nooline/post-login',
  ['common/js/nooline/load-components'],
  function () {

  var N = window.Nooline;

  /**
   * postLogin
   * Post creds to the server.
   *
   * Sends the username and what type of login request this is to the server
   * to match credentials.  The server can then determine if a rejection, or
   * reauth is in order.
   *
   * @param username  {String}  The user's username.
   * @param password  {String}  A hash of the user's password.
   * @param type      {String}  The type of login attempt this is.
   * @return                    None.
   */
  N.postLogin = function postLogin (username, password, type) {

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

});
