define('common/js/nooline/logout',
  ['common/js/nooline/load-components'],
  function () {

  var N = window.Nooline;

  /**
   * logout
   * Log the user out.
   *
   * Removes the logged in widgets, animating them out, and expire the login
   * session.
   *
   * @return  None.
   */
  N.logout = function () {

    clearTimeout(N.expireLogin);

    delete sessionStorage.lastLoginAttempt;

    $('.logged-in-panel')
      .addClass('hidden')
      /**
       * removePanel
       * Yank the element when it's finished animating out.
       *
       */
      .one('transitionend webkitTransitionEnd', function removePanel () {
        $(this).remove();
    });

    $('.logout-button')
      .removeClass('logout-button')
      .addClass('login-button')
      .html('Login');

    N.removeControls();

    $(document.body).removeClass('logged-in');
  };

});
