var assert = require("assert");

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){

      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));

    });
  });
});

describe('Category', function () {
  it('should exist', function () {

    var Category = require('../common/js/nooline/models/category.js');
    var _category = new Category();

    assert(_category instanceof Category);
  })
})