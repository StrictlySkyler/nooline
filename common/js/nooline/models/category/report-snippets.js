// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) { 
    exports = module.exports = func(); 
  } 
}).define('common/js/nooline/models/category/report-snippets', [], function () {

  var N = this.Nooline;

  /**
   * Reports that the Collection of ContentSnippet models associated with this
   * category has finished loading.
   * @return {Object} The Category model itself.
   */
  N.Models.Category.prototype.reportSnippets = function () {
      
    this.trigger('category:loaded');

    return this;

  };
});