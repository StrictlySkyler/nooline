
!(function buildComponents () {
  
  requirejs([
    'nooline/build-login-panel'
  ], function setupListeners() {
    
    requirejs(['nooline/assign-listeners']);
    
  });
  
}());