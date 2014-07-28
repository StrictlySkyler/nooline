define('common/js/nooline/show-login-panel',
  ['common/js/nooline/load-components'],
  function () {

  var N = window.Nooline;

  /**
   * showLoginPanel
   * Creates a login panel.
   *
   * Creates all the DOM elements, and loads all of the modules required for
   * handling authentication.
   *
   * @param e {Object}  The event triggering the login panel.
   * @return            None.
   */
  N.showLoginPanel = function showLoginPanel (e) {

    var $loginButton = $(e.target);
    var $panel = $('<section id="main-login" class="login hidden"></section>');

    require([
      'node_modules/crypto-js/core',
      'node_modules/crypto-js/sha3',
      'node_modules/crypto-js/enc-base64',
      'common/js/nooline/validate',
      'common/js/nooline/reject-login',
      'common/js/nooline/hash-this',
      'common/js/nooline/post-login',
      'common/js/nooline/receive-login'
    /**
     * buildInternals
     * Build the internals of the login panel.
     *
     * Assigns the Crypto module to the global namespace (which it expects),
     * and builds the DOM element internals for the login panel.
     *
     * @param Crypto  {Object}  The entry point for crypto ops, from the lib.
     * @return                  None.
     */
    ], function buildInternals (Crypto) {

      window.Crypto = Crypto;

      /**
       * revealPanel
       * Reveals the login panel, allowing for animations.
       *
       */
      requestAnimationFrame(function revealPanel() {
        $panel
          .removeClass('hidden')
          .on({
            /**
             * removeHighlight
             * Removes the highlight, if present, from the close-section
             * button.
             *
             */
            'click.close-section': function removeHighlight () {
              $loginButton.removeClass('active');
            }
          }, '.close-section-button');
      });
    });

    if ($loginButton.hasClass('active')) {
      console.log('This section is already open.');

      return false;
    }

    $loginButton
      .addClass('active');

    $panel
      .append('<form class="login-form form"></form>')
      .children('.login-form')
      .append('<label class="login-form label" '
        + 'for="username-input">Username:</label>')
      .append('<input class="login-form input username" '
        + 'name="username-input" type="text" placeholder="Who are you?">')
      .append('<label class="login-form label" '
        + 'for="password-input">Password:</label>')
      .append('<input class="login-form input password" '
        + 'name="password-input" type="password" placeholder="It\'s a secret!">')
      .append('<button class="go-button button" '
        + 'title="Go!">Login</button>')
      .append('<button class="close-section-button button" '
        + 'title="Cancel">Close Login Section</button>');

    if (N.settings['allow-signup']) {
      $panel
        .children('.login-form')
        .append('<button class="create-account-button button"'
        + 'title="Want to make an account?">Create Account</button>');
    }

    // TODO: Make this a configurable element, allowing it to appear in other
    // places on the page.
    $panel.appendTo('#global-header');

  };

});
