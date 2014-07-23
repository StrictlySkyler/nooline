// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/models/category/load-collection', [], function () {

  var N = this.Nooline;

  /**
   * Loads a collection of content snippets to the model based on the category
   * desired.
   * @param  {String} category The desired category of content snippets.
   * @param {String} type Optinal. The type of category desired, specifically.
   * @return {Object}          Returns the Category model itself.
   */
  N.Models.Category.prototype.loadCollection = function (info, type) {
    var fs;
    var contentPath;
    var category;
    var Snippets;

    if (typeof module !== 'undefined') {
      fs = require('fs');
      contentPath = __root + '/sites/' + info.req.host + '/content';
      category = type || info.req.query.type || info.categories[0];
      Snippets = require(__root + '/common/js/nooline/collections/snippets');
      info.index = contentPath + '/index.json';
      info.snippets = contentPath + '/snippets/';

      this.set({
        info: info,
        type: category,
        contentPath: contentPath,
        snippets: new Snippets(),
        metaFile: contentPath + '/meta/' + category + '.json'
      });

      this.get('snippets').parent = this;

      fs.readFile(this.get('metaFile'), 'utf8', this.loadMeta.bind(this));

    }

    return this;

  };
});
