define('common/js/nooline/attempt-login',
  ['common/js/nooline/load-components'],
  function () {

  var N = this.Nooline;

  /**
   * attemptLogin
   * Have a go at logging in.
   *
   * If the credentials validate, check to see if they match on the server,
   * otherwise reject them and let the user know.  Also, if we're loading the
   * page, check to see if the user has already logged in, and attempt to log
   * them in again if they are still within the bounds of the session time.
   *
   * @param e   {Object}  Event from the login form.
   * @return              None.
   */
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

  return N;

});
