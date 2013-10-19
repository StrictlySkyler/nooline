
;(function buildSync (N) {
  
  N.Views.ContentSnippetView.prototype.save = function () {
    
    this.model.save({
      headline: this.$editableElement.children('.headline').text(),
      text: this.$editableElement.children('.text').html()
    });
  };

}(window.Nooline));