
!(function assignListeners (N) {
  
  var $document = $(document);
  
  $document.on({
    'click.login': N.loginPanel
  }, '.login-button');
  
  $document.on({
    'click.close-section': N.closeSection
  }, '.close-section-button');
  
  $document.on({
    'click.go': N.attemptLogin
  }, '.login-form .go-button');
  
  $document.on({
    'submit.form': function preventFormDefault (e) {
      e.preventDefault();
    }
  }, '.form');
  
}(window.Nooline));
