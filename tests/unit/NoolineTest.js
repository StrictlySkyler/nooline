
describe('Nooline', function () {

  GLOBAL.__root = __dirname + '/../../';
  var assert = require('assert');
  var path = __root + 'common/js/nooline/';

  beforeEach(function () {
    GLOBAL.window = require('jsdom').jsdom('<html></html>').parentWindow;
    GLOBAL.document = require('jsdom').jsdom('<html></html>')
      .parentWindow
      .document;
    GLOBAL.$ = require('jquery');
    GLOBAL.requirejs = function (modules) {

      return modules;
    };

    GLOBAL.requirejs.config = function (config) {

      return config;
    };
    GLOBAL.define = require('requirejs').define;

  });

  it('should be able to initialize', function () {

    var start = require(path + 'start');
    var loader = require(path + 'load-components');

    assert(start, 'Something is keeping Nooline from constructing itself!');
    assert(loader, 'Something in the load process is dying!');

  });

  it('should successfully execute event bindings', function () {

    require(path + 'start');
    require(path + 'load-components');
    var listeners = require(path + 'assign-listeners');

    assert(listeners, 'Nooline is failing to bind events!  Did it load?');
  });

  it('should be able to load the component which logs in', function () {

    require(path + 'start');
    require(path + 'load-components');
    var component = require(path + 'attempt-login');

    assert(component, 'Nooline login mechanism is not loaded!');
  });

  it('should be able to load the controls builder', function () {

    require(path + 'start');
    require(path + 'load-components');
    var builder = require(path + 'build-controls');

    assert(builder, 'Controls builder has not been loaded!');
  });

  it('should be able to load UI feedback controls', function () {

    require(path + 'start');
    require(path + 'load-components');
    var closeSection = require(path + 'close-section');
    var showLoginPanel = require(path + 'show-login-panel');
    var showLoginSuccess = require(path + 'show-login-success');
    var rejectLogin = require(path + 'reject-login');

    assert(closeSection, 'N.closeSection method has not been loaded!');
    assert(showLoginPanel, 'Login panel feedback method not loaded!');
    assert(showLoginSuccess, 'Login success display method not loaded!');
    assert(rejectLogin, 'Reject login display not loaded!');
  });

  afterEach(function () {
    delete GLOBAL._root;
    delete GLOBAL.window;
    delete GLOBAL.document;
    delete GLOBAL.$;
    delete GLOBAL.requirejs;
    delete GLOBAL.define;
  });
});
