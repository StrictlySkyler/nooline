
;(function buildRejectLogin (N) {
  
  N.rejectLogin = function rejectLogin ($section) {
    var $error = $('<p class="error-message hidden"></p>')
      .html(
        'Looks like those credentials are invalid.  Make sure that the '
        + '<em>username</em> is at least <em>2</em> characters long, '
        + 'containing only <em>letters</em>, <em>numbers</em>, and '
        + '<em>spaces</em>, and that '
        + 'the <em>password</em> is at least <em>12</em> '
        + 'characters long, containing <em>letters</em>, <em>numbers</em>, '
        + '<em>spaces</em>, and any of '
        + 'the following symbols: <em>!@#$%^&*<>?</em>'
      );
    
    $section
      .addClass('invalid')
      .append($error);
    
    console.log('Credentials rejected.');
    
    setTimeout(function showError () {
      $error.removeClass('hidden');
      
      delete N.$activeLogin;
    }, 0);
  };
  
}(window.Nooline));