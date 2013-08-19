
;(function buildShowLoginSuccess (N) {
  
  N.showLoginSuccess = function showLoginSuccess (data) {
    
    $(document.body).addClass('logged-in');

    $('.login-button')
      .removeClass('login-button active')
      .addClass('logout-button')
      .html('Logout');
    
    $('.login')
      .addClass('hidden')
      .one('webkitTransitionEnd', function hidePanel() {
        $(this).remove();
    });
    
    N.expireLogin = setTimeout(function expireLogin () {
      
      delete sessionStorage.lastLoginAttempt;
      
    }, 3600000);
    
    N.buildControls(data);
    
  };

}(window.Nooline));