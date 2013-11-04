
;(function buildEnableEditing (N) {
  
  N.Models.ContentSnippet.prototype.enableEditing = function () {

    this.view.setOptions('editable', true);

  }
}(window.Nooline));