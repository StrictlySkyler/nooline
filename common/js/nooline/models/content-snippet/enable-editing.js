// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/models/content-snippet/enable-editing',
  [],
  function () {

  var N = this.Nooline;

  /**
   * enableEditing
   * Enables editing content.
   *
   * Turns on the ability to edit a particular ContentSnippet.
   *
   * @return  None.
   */
  N.Models.ContentSnippet.prototype.enableEditing = function () {

    this.view.setOptions('editable', true);

  };

  return 'models/content-snippet/enable-editing';

});
