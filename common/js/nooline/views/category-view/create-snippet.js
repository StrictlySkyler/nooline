// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) { 
    exports = module.exports = func(); 
  } 
}).define('common/js/nooline/views/category-view/create-snippet', [], function () {

  var N = this.Nooline;
  
  /**
   * Triggers an event that we're creating a new ContentSnippet.  Usually called
   * when the user is creating new content on the client.
   * @return {Object} The CategoryView itself.
   */
  N.Views.CategoryView.prototype.createSnippet = function () {
    this.model.trigger('create');

    return this;
  };

  // return 'views/category-view/create-snippet';

});