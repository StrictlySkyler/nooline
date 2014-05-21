// Boilerplate for loading via CJS and AMD both.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) { 
    exports = module.exports = func(); 
  } 
}).define(
  'common/js/nooline/collections/content-categories/bind-events', 
  [], 
  function () {

  var N = this.Nooline;
    
  /**
   * bindEvents
   * Attach any event listeners to the collection.
   *
   * Currently there aren't any.
   *
   * @return  None.
   */
  N.Collections.ContentCategories.prototype.bindEvents = function () {
    
    this.on({
      'category:loaded': this.reportCategory,
      'categories:loaded': this.renderCategories
    });
  };

  // For r.js assembly.
  return 'collections/content-categories/bind-events';

});
