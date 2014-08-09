
describe('Nooline', function () {

  var __root = __dirname + '/../../';
  var assert = require('assert');

  before(function () {
    GLOBAL.window = require('jsdom').jsdom('<html></html>').parentWindow;
    GLOBAL.document = require('jsdom').jsdom('<html></html>')
      .parentWindow
      .document;
    GLOBAL.$ = require('jquery');
    GLOBAL._ = require('underscore');
    GLOBAL.requirejs = function (modules) {

      return modules;
    };

    GLOBAL.requirejs.config = function (config) {

      return config;
    };
    GLOBAL.define = function (name, dependencies, callback) {
      exports = module.exports = callback();
    };

    require(__root + 'common/js/nooline/start');
    require(__root + 'common/js/nooline/load-components');

  });

  it('should be able to initialize', function () {

    assert(
      GLOBAL.Nooline, 
      'Something is keeping Nooline from constructing itself!'
    );
    assert(
      GLOBAL.Nooline.$document, 
      'Something in the load process is dying!'
    );

  });

  it('should successfully execute event bindings', function () {

    var listeners = require(__root + 'common/js/nooline/assign-listeners');

    assert(listeners, 'Nooline is failing to bind events!  Did it load?');
  });

  it('should be able to load a login component', function () {

    var component = require(__root + 'common/js/nooline/attempt-login');

    assert(component, 'Nooline login mechanism is not loaded!');
  });

  it('should be able to load the controls builder', function () {

    var builder = require(__root + 'common/js/nooline/build-controls');

    assert(builder, 'Controls builder has not been loaded!');
  });

  it('should be able to load UI feedback controls', function () {

    var closeSection = require(__root + 'common/js/nooline/close-section');
    var showLoginPanel = require(__root + 'common/js/nooline/show-login-panel');
    var showLoginSuccess = require(__root 
       + 'common/js/nooline/show-login-success'
    );
    var rejectLogin = require(__root + 'common/js/nooline/reject-login');
    var removeControls = require(__root + 'common/js/nooline/remove-controls');

    assert(closeSection, 'N.closeSection method has not been loaded!');
    assert(showLoginPanel, 'Login panel feedback method not loaded!');
    assert(showLoginSuccess, 'Login success display method not loaded!');
    assert(rejectLogin, 'Reject login display not loaded!');
    assert(removeControls, 'Control remover not loaded!');
  });

  it('should be able to validate user credentials', function () {
    
    require(__root + 'common/js/nooline/validate');
    
    var someValidUsername = 'skyler';
    var someValidPassword = 'abc123 ABC!@#';

    assert(Nooline.validate, 'Validate did not get loaded!');
    assert(Nooline.validate({
      username: someValidUsername,
      password: someValidPassword
    }), 'Unable to parse proper credentials!');

  });

  it('should reject an invalid username', function () {

    require(__root + 'common/js/nooline/validate');

    var someTooShortUsername = 's';
    var someUsernameWithASymbol = 'skyler*';
    var someValidPassword = 'abc123 ABC!@#';

    assert.equal(Nooline.validate({
      username: someTooShortUsername,
      password: someValidPassword
    }), false, 'Not rejecting for too short usernames!');

    assert.equal(Nooline.validate({
      username: someUsernameWithASymbol,
      password: someValidPassword
    }), false, 'Usernames should not accept symbols!');

  });

  it('should reject a password too short', function () {

    require(__root + 'common/js/nooline/validate');

    var someValidUsername = 'skyler';
    var someTooShortPassword = 'too short!';

    assert.equal(Nooline.validate({
      username: someValidUsername,
      password: someTooShortPassword
    }), false, 'Passwords are being allowed too short!');
  });

  after(function () {
    delete GLOBAL.window;
    delete GLOBAL.document;
    delete GLOBAL.$;
    delete GLOBAL.requirejs;
    delete GLOBAL.define;
  });
});
