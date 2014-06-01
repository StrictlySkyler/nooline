var assert = require("assert");

describe('A Category', function () {
  var Category = require('../common/js/nooline/models/category.js');
  var CategoryView = require('../common/js/nooline/views/category-view.js');
  var _category;

  it('should be able to be created', function () {

    _category = new Category();

    assert(_category instanceof Category);
  });

  it('should have a view attached to it', function () {

    assert(_category.view instanceof CategoryView);
  });
});