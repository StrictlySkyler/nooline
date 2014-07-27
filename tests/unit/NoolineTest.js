
describe('Nooline', function () {

  var assert = require('assert');

  beforeEach(function () {
    GLOBAL.__root = __dirname + '/../../';
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

    var start = require(__root + 'common/js/nooline/start');
    var loader = require(__root + 'common/js/nooline/load-components');

    assert(start, 'Something is keeping Nooline from constructing itself!');
    assert(loader, 'Something in the load process is dying!');

  });

  it('should successfully execute event bindings', function () {

    require(__root + 'common/js/nooline/start');
    require(__root + 'common/js/nooline/load-components');
    var listeners = require(__root + 'common/js/nooline/assign-listeners');

    assert(listeners, 'Nooline is failing to bind events!  Did it load?');
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
