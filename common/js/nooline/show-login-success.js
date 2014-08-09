define('common/js/nooline/show-login-success',
  ['common/js/nooline/load-components'],
  function () {

  var N = this.Nooline;

  /**
   * showLoginSuccess
   * Tell the user login succeeded.
   *
   * Informs the user that the login was successful, and also sets a timeout
   * for the session.
   *
   * @param data  {Object}  The data about which controls to build.
   * @return                None.
   */
  N.showLoginSuccess = function showLoginSuccess (data) {

    $(document.body).addClass('logged-in');

    $('.login-button')
      .removeClass('login-button active')
      .addClass('logout-button')
      .html('Logout');

    $('.login')
      .addClass('hidden')
      .one(
        /**
         * removeLogin
         * Remove the login panel after animations have fired.
         *
         */
        'transitionend webkitTransitionEnd', function removeLogin () {
        $(this).remove();
    });

    /**
     * expireLogin
     * If the user is idle for long enough, expire the session.
     *
     */
    N.expireLogin = setTimeout(function expireLogin () {

      delete sessionStorage.lastLoginAttempt;

    // TODO: Separate this from idle-timeout, which should be ~10min.
    }, 3600000);

    N.buildControls(data);

  };

  return N;

});
