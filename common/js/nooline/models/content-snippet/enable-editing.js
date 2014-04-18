
define(function () {

  var N = window.Nooline;
  
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
