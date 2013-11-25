
define(function () {
  var N = window.Nooline;
    
  N.showLoginSuccess = function showLoginSuccess (data) {
    
    $(document.body).addClass('logged-in');

    $('.login-button')
      .removeClass('login-button active')
      .addClass('logout-button')
      .html('Logout');
    
    $('.login')
      .addClass('hidden')
      .one(
        'transitionend webkitTransitionEnd', function removeLogin () {
        $(this).remove();
    });
    
    N.expireLogin = setTimeout(function expireLogin () {
      
      delete sessionStorage.lastLoginAttempt;
    
    // TODO: Separate this from idle-timeout, which should be ~10min.
    }, 3600000); 
    
    N.buildControls(data);
    
  };

});