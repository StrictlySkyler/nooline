
;(function buildCreateSnippet (N) {
  
  N.Views.CategoryView.prototype.createSnippet = function () {
    this.model.trigger('create');
  };

}(window.Nooline));