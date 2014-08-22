define(
  'common/js/nooline/collections/content-categories/load-models', 
  [], 
  function () {

  var N = this.Nooline;

  N.Collections.ContentCategories.prototype.loadModels = function (info) {

    var Category;

    this.loaded = 0;
    this.info = info;

    if (typeof module !== 'undefined') {

      Category = require(__root + '/common/js/nooline/models/category');

      info.categories.forEach((function (category) {

        var _category = new Category();

        this.add(_category);

        _category.loadCollection(info, category);
      }).bind(this));
    }
  };

});
