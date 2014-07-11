// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/models/content-snippet/remove', [], function () {

  var N = this.Nooline;

  /**
   * remove
   * Get rid of it!
   *
   * Removes a particular ContentSnippet from the collection (the Category
   * Model) and also from the DOM.
   *
   * @return  None.
   */
  N.Models.ContentSnippet.prototype.remove = function () {

    this.collection.remove(this).view.trigger('remove');

    delete this.view;

  };

  return 'models/content-snippet/remove';

});
