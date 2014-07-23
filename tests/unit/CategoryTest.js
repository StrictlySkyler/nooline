var assert = require("assert");
var jsdom = require('jsdom').jsdom;

GLOBAL.__root = __dirname;
GLOBAL.window = jsdom('<html></html>').parentWindow;

describe('A Category', function () {
  var Category = require('../../common/js/nooline/models/category.js');
  var CategoryView = require('../../common/js/nooline/views/category-view.js');
  var Snippets = require('../../common/js/nooline/collections/snippets.js');
  var _category;
  GLOBAL.__root = __dirname + '/../..';

  it('should be able to be created', function () {

    _category = new Category();

    assert(
      _category instanceof Category,
      '_category is not an instance of Category model.'
    );
  });

  it('should have a view attached to it', function () {

    assert(
      _category.view instanceof CategoryView,
      'Looks like the view is missing, or the wrong thing.'
    );
  });

  ////////////////////////////////////////////////////////////
  // Need to create some dummy content for testing for this //
  ////////////////////////////////////////////////////////////
  // it('should be able to load a collection of content', function () {
  //   var info = {
  //     req: {
  //       host: 'someHost.com'
  //     }
  //   };
  //   var type = 'someType';

  //   _category.loadCollection(info, type);

  //   assert(
  //     _category.get('snippets') instanceof Snippets,
  //     'No collection of content found, or it is the wrong thing.'
  //   );
  // });
});
