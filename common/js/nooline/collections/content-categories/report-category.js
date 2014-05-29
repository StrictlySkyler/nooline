// Boilerplate for loading via CJS and AMD both.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) { 
    exports = module.exports = func(); 
  } 
}).define(
  'common/js/nooline/collections/content-categories/report-category', 
  [], 
  function () {

  var N = this.Nooline;

  N.Collections.ContentCategories.prototype.reportCategory = function () {

    this.loaded++;

    if (this.loaded === this.length) {

      this.trigger('categories:loaded');
    }
  };

});