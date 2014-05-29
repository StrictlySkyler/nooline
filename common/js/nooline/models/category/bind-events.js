// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) { 
    exports = module.exports = func(); 
  } 
}).define('common/js/nooline/models/category/bind-events', [], function () {

  var N = this.Nooline;
  
  /**
   * bindEvents
   * Attach event listeners.
   *
   * Any events we might need for the Category Model, such as creation of a
   * new Snippet.
   *
   * @return  None.
   */
  N.Models.Category.prototype.bindEvents = function () {
    
    this.on({
      'create': this.createSnippet,
      'collection:loaded': this.reportSnippets,
      'snippet:loaded': this.countSnippets
    });
  };

  // For r.js.
  // return 'models/category/bind-events';

});
