
!(function assignListeners (N) {
  
  $('.login-button').on({
    'click.login': N.loginPanel
  });
  
}(window.Nooline));
