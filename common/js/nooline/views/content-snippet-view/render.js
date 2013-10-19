
;(function buildRender (N) {
  
  N.Views.ContentSnippetView.prototype.render = function () {
    
    if (this.getOption('editable') 
      && this.getOption('editor') === undefined) {

      this.enableEditing();
    }

    if (!this.getOption('editable')) {
      this.disableEditing();
    }

    if (this.getOption('editor')) {
      
      this.showEditor();
      
    } else if (this.getOption('editor') === false) {

      this.hideEditor();
    }
  };

}(window.Nooline));