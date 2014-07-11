// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/models/content-snippet/create', [], function () {

  var N = this.Nooline;

  /**
   * create
   * (Re)Create this snippet.
   *
   * Some of the snippets are built via AJAX, and while the model may have
   * already been setup, the view isn't ready yet (usually waiting on some
   * 3rd party library to bind events, how rude).  This performs any setup
   * the model (and view) might need when the model is notified that the view
   * has finished setting itself up.
   *
   * @return
   */
  N.Models.ContentSnippet.prototype.create = function () {

    this.view.setOptions('create', true);
  };

  return 'models/content-snippet/create';

});
