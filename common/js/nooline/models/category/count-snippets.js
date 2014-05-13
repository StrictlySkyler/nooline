// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) { 
    exports = module.exports = func(); 
  } 
}).define('common/js/nooline/models/category/count-snippets', [], function () {

  var N = this.Nooline;

  /**
   * Called each time a ContentSnippet is loaded, and when the entire set has
   * been loaded, notifies that the Collection is complete.
   * @return {Object} The Category model itself.
   */
  N.Models.Category.prototype.countSnippets = function () {
      
    if (this.get('snippets').length === this.get('total')) {

      this.trigger('collection:loaded');
    }

    return this;

  };
});