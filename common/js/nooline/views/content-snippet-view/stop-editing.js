
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/views/content-snippet-view/stop-editing',
  [],
  function () {

  var N = this.Nooline;

  /**
   * stopEditing
   * Stop editing the view.
   *
   * Notifies the view that we're going to stop editing, and to disable any
   * such features.
   *
   * @return  None.
   */
  N.Views.ContentSnippetView.prototype.stopEditing = function () {

    this.trigger('editor:disable');
  };

  // return 'views/content-snippet-view/stop-editing';

});
