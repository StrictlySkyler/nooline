// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define(
  'common/js/nooline/models/content-snippet/unpublish',
  [],
  function () {

  var N = this.Nooline;

  N.Models.ContentSnippet.prototype.unpublish = function (info) {

    var fs;

    function removeFromIndex (error, data) {

      var index = JSON.parse(data);
      var category = index.categories[this.get('type')];
      var newIndex;

      index.count--;

      category.splice(category.indexOf(this.get('index')), 1);

      newIndex = JSON.stringify(index, null, '\t');

      fs.writeFile(
        info.index,
        newIndex,
        this.trigger.bind(this, 'snippet:unpublished')
      );
    }

    if (typeof module === 'undefined') {

      this.set('published', false);

      this.view.trigger('remove');

      return this.sync('update', this);
    }

    fs = require('fs');

    return fs.readFile(info.index, 'utf8', removeFromIndex.bind(this));

  };

});
