
define(function () {

  var N = window.Nooline;
  
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
