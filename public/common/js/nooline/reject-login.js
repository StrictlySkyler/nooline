
!(function buildRejectLogin (N) {
  
  N.rejectLogin = function rejectLogin ($section) {
    var $error = $('<p class="error-message hidden"></p>')
      .text(
        'Looks like those credentials are invalid.  Make sure that the '
        + 'username is at least 2 characters long, containing only letters, '
        + 'numbers, and spaces, and that the password is at least 12 '
        + 'characters long, containing letters, numbers, spaces, and any of '
        + 'the following symbols: !@#$%^&*<>?'
      );
    
    $section
      .addClass('invalid')
      .append($error);
    
    setTimeout(function showError () {
      $error.removeClass('hidden');
    }, 0);
  };
  
}(window.Nooline));