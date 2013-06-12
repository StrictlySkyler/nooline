
!(function buildLoginPanel (N) {
  
  N.loginPanel = function loginPanel (e) {
    
    $(e.target)
      .addClass('active')
      .off('.login');
    
    var $panel = $('<section id="login" class="login building"></section>');
    
    $panel
      .append('<label class="login-form" '
        + 'for="username-input">Username:</label>')
      .append('<input class="login-form username" '
        + 'id="username-input" type="text" placeholder="Who are you?">')
      .append('<label class="login-form password" '
        + 'for="password-input">Password:</label>')
      .append('<input class="login-form" ' 
        + 'id="password-input" type="password" placeholder="It\'s a secret!">')
      .appendTo('#global-header');
    
    setTimeout(function showPanel() {
      $panel
        .removeClass('building');
    }, 0);
    
    
  };
  
}(window.Nooline));