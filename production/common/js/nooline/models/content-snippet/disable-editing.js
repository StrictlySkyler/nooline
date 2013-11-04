
;(function buildDisableEditing (N) {
  
  N.Models.ContentSnippet.prototype.disableEditing = function () {

    this.view.setOptions('editable', false);

  }
}(window.Nooline));