
;(function buildSync (N) {
  
  N.Views.ContentSnippetView.prototype.sync = function () {
    
    this.model.save({
      headline: this.$editableElement.children('.headline').text(),
      text: this.$editableElement.children('.text').html()
    }, {
      // patch: true
    });
  };

}(window.Nooline));