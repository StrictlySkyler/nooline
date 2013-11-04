
define("common/js/nooline/assign-listeners", function(){
  ;(function assignListeners (N) {
    
    // TODO: Refactor this.
    // 
    // Global event listeners.
    // 
    // Most of these seem to relate to panels/widgets.  Might make those into
    // views.
    N.$document.on({
      'click.login': function showLoginPanel (e) {
        N.showLoginPanel(e);
      }
    }, '.login-button');

    N.$document.on({
      'click.logout': function logout (e) {
        N.logout(e);
      }
    }, '.logout-button');
    
    N.$document.on({
      'click.close-section': function closeSection (e) {
        N.closeSection(e);
      }
    }, '.close-section-button');
    
    N.$document.on({
      'click.go': function attemptLogin (e) {
        N.attemptLogin(e);
      }
    }, '.login-form .go-button');
    
    N.$document.on({
      'submit.form': function preventFormDefault (e) {
        e.preventDefault();
      }
    }, '.form');
    
  }(window.Nooline));
});