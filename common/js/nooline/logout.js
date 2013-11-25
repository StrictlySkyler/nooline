
define(function () {
  var N = window.Nooline;
    
  N.logout = function () {

    clearTimeout(N.expireLogin);

    delete sessionStorage.lastLoginAttempt;

    $('.logged-in-panel')
      .addClass('hidden')
      .one('transitionend webkitTransitionEnd', function removePanel () {
        $(this).remove();
    });

    $('.logout-button')
      .removeClass('logout-button')
      .addClass('login-button')
      .html('Login');

    N.removeControls();

    $(document.body).removeClass('logged-in');
  };

});