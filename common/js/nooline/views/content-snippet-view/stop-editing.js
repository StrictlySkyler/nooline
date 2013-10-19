
;(function buildStopEditing (N) {
  
  N.Views.ContentSnippetView.prototype.stopEditing = function (e) {
    
    e.data.this.trigger('editor:disable');
  };

}(window.Nooline));