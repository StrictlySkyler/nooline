
define(function () {

  var N = window.Nooline;
  
  N.Models.ContentSnippet.prototype.disableEditing = function () {

    this.view.setOptions('editable', false);

  };

  return 'models/content-snippet/disable-editing';

});