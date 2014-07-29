define('common/js/nooline/reject-login',
  ['common/js/nooline/load-components'],
  function () {

  var N = window.Nooline;

  /**
   * rejectLogin
   * Reject the user login attempt.
   *
   * Invalid credentials for some reason or another.  Notify the user.
   *
   * @param $section  {Object}  jQuery object of the active login section.
   * @return                    None.
   */
  N.rejectLogin = function rejectLogin ($section) {
    var message = 'Looks like those credentials are invalid.  '
      + 'Make sure that the '
      + '<em>username</em> is at least <em>2</em> characters long, '
      + 'containing only <em>letters</em>, <em>numbers</em>, and '
      + '<em>spaces</em>, and that '
      + 'the <em>password</em> is at least <em>12</em> '
      + 'characters long, containing <em>letters</em>, <em>numbers</em>, '
      + '<em>spaces</em>, and any of '
      + 'the following symbols: <em>!@#$%^&*<>?</em>';

    var $error = $('<p class="error-message hidden"></p>')
      .html(message);

    $section
      .addClass('invalid')
      .append($error);

    console.log('Credentials rejected.');

    /**
     * showError
     * Unhide the error, animating it in if applicable.
     *
     * TODO: Swap this for requestAnimationFrame.
     */
    setTimeout(function showError () {
      $error.removeClass('hidden');

      delete N.$activeLogin;
    }, 0);
  };

  return N;

});
