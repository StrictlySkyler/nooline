
;(function buildLogout (N) {
  
  N.logout = function () {

    clearTimeout(N.expireLogin);

    delete sessionStorage.lastLoginAttempt;

    $('.logged-in-panel')
      .addClass('hidden')
      .one('webkitTransitionEnd', function hidePanel() {
        $(this).remove();
    });

    $('.logout-button')
      .removeClass('logout-button')
      .addClass('login-button')
      .html('Login');

    $(document.body).removeClass('logged-in');
  };

}(window.Nooline));