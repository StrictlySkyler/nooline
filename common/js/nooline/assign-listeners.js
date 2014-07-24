
/**
 * globalEvents
 * Defines our global event listeners.
 *
 * See comments below.  This file will go away.
 *
 */
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/assign-listeners',
  ['common/js/nooline/load-components'],
  function globalEvents () {

  var N = window.Nooline;

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

});
