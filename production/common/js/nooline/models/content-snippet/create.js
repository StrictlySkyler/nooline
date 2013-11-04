
;(function buildCreate (N) {
  
  N.Models.ContentSnippet.prototype.create = function () {
    
    this.view.setOptions('create', true);
  };

}(window.Nooline));