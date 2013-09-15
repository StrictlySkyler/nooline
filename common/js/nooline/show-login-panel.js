
;(function buildLoginPanel (N) {
  
  N.showLoginPanel = function showLoginPanel (e) {
    
    var $loginButton = $(e.target);
    var $panel = $('<section id="main-login" class="login hidden"></section>');
    
    require([
      'sharedlibs/crypto-js/core',
      'sharedlibs/crypto-js/sha3',
      'sharedlibs/crypto-js/enc-base64',
      'nooline/validate',
      'nooline/reject-login',
      'nooline/hash-this',
      'nooline/post-login',
      'nooline/receive-login'
    ], function validateLoaded (Crypto) {
      
      window.Crypto = Crypto;
      
      requestAnimationFrame(function showPanel() {
        $panel
          .removeClass('hidden')
          .on({
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
        + 'title="Go!"></button>')
      .append('<button class="close-section-button button" '
        + 'title="Cancel"></button>');
    
    if (N.settings['allow-signup']) {
      $panel
        .children('.login-form')
        .append('<button class="create-account-button button"'
        + 'title="Want to make an account?">Create Account</button>');
    }
    
    $panel.appendTo('#global-header');
    
  };
  
}(window.Nooline));