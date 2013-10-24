
;(function buildStartEditing (N) {
  
  N.Views.ContentSnippetView.prototype.startEditing = function () {
    
    this.trigger('editor:enable');
  };

}(window.Nooline));