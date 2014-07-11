// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/models/content-snippet/disable-editing',
  [],
  function () {

  var N = this.Nooline;

  /**
   * disableEditing
   * No more words for you!
   *
   * Disables the ability to edit the content of a particular ContentSnippet.
   *
   * @return  None.
   */
  N.Models.ContentSnippet.prototype.disableEditing = function () {

    this.view.setOptions('editable', false);

  };

  return 'models/content-snippet/disable-editing';

});
