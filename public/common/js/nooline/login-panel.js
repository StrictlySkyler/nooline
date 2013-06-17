
!(function buildLoginPanel (N) {
  
  N.loginPanel = function loginPanel (e) {
    
    var $loginButton = $(e.target);
    
    if ($loginButton.hasClass('active')) {
      console.log('This section is already open.');
      
      return false;
    }
    
    $loginButton
      .addClass('active');
    
    var $panel = $('<section id="main-login" class="login hidden"></section>');
    
    $panel
      .append('<form class="login-form form"></form>')
      .children('.login-form')
      .append('<label class="login-form label" '
        + 'for="username-input">Username:</label>')
      .append('<input class="login-form username" '
        + 'name="username-input" type="text" placeholder="Who are you?">')
      .append('<label class="login-form label" '
        + 'for="password-input">Password:</label>')
      .append('<input class="login-form password" ' 
        + 'name="password-input" type="password" placeholder="It\'s a secret!">')
      .append('<button class="go-button button" '
        + 'title="Go!"></button>')
      .append('<button class="close-section-button button" '
        + 'title="Cancel"></button>');
    $panel.appendTo('#global-header');
    
    require([
      'nooline/validate',
      'nooline/reject-login',
      'nooline/submit-creds'
    ], function validateLoaded () {
      setTimeout(function showPanel() {
        $panel
          .removeClass('hidden')
          .on({
            'click.close-section': function removeHighlight () {
              $loginButton.removeClass('active');
            }
          }, '.close-section-button');
      }, 0);
    });
    
  };
  
}(window.Nooline));