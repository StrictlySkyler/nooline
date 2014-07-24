
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/views/content-snippet-view/remove',
  [],
  function () {

  var N = this.Nooline;

  /**
   * remove
   * Remove a ContentSnippetView from the DOM.
   *
   * Yanks out the DOM elements, and cleans up after them, removing any extra
   * references.
   *
   * @return  None.
   */
  N.Views.ContentSnippetView.prototype.remove = function () {

    this.$el.remove();

    delete this.model;

  };

  // return 'views/content-snippet-view/remove';

});
