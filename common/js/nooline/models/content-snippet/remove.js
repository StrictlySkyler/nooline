
;(function buildRemove (N) {
  
  N.Models.ContentSnippet.prototype.remove = function () {
    
    this.collection.remove(this).view.trigger('remove');

    delete this.view;
    
  };

}(window.Nooline));