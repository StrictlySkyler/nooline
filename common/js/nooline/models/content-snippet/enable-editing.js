
define(function () {

  var N = window.Nooline;
  
  N.Models.ContentSnippet.prototype.enableEditing = function () {

    this.view.setOptions('editable', true);

  };

  return 'models/content-snippet/enable-editing';
  
});