
;(function buildStopEditing (N) {
  
  N.Views.ContentSnippetView.prototype.stopEditing = function () {
    
    this.trigger('editor:disable');
  };

}(window.Nooline));