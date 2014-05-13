// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) { 
    exports = module.exports = func(); 
  } 
}).define('common/js/nooline/views/category-view/bind-events', [], function () {

  var N = this.Nooline;
  
  /**
   * Attach event listeners for various view-related events.
   * @return {Object} The CategoryView itself.
   */
  N.Views.CategoryView.prototype.bindEvents = function () {

    if (typeof document !== 'undefined') {
      this.$el.on('click', '.create-content', this.createSnippet.bind(this));
    }
    
    this.on({
      'options:change': this.render.bind(this)
    });

    this.model.on({
      'category:loaded': this.render.bind(this)
    });

    return this;

  };

  // return 'views/category-view/bind-events';

});