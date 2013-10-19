
;(function buildStartEditing (N) {
  
  N.Views.ContentSnippetView.prototype.startEditing = function (e) {
    
    e.data.this.trigger('editor:enable');
  };

}(window.Nooline));