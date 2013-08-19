
;(function assignListeners (N) {
  
  var $document = $(document);
  
  $document.on({
    'click.login': function showLoginPanel (e) {
      N.showLoginPanel(e);
    }
  }, '.login-button');

  $document.on({
    'click.logout': function logout (e) {
      N.logout(e);
    }
  }, '.logout-button');
  
  $document.on({
    'click.close-section': function closeSection (e) {
      N.closeSection(e);
    }
  }, '.close-section-button');
  
  $document.on({
    'click.go': function attemptLogin (e) {
      N.attemptLogin(e);
    }
  }, '.login-form .go-button');
  
  $document.on({
    'submit.form': function preventFormDefault (e) {
      e.preventDefault();
    }
  }, '.form');
  
}(window.Nooline));
