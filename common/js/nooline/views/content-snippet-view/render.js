
define(function () {

  var N = window.Nooline;
  
  N.Views.ContentSnippetView.prototype.render = function () {

    if (this.getOption('create')) {
      this.create();
      return;
    }
    
    if (this.getOption('editable') 
      && this.getOption('editor') === undefined) {

      this.enableEditing();
    }

    if (this.getOption('editable') === false) {
      this.disableEditing();
    }

    if (this.getOption('editor')) {
      
      this.showEditor();
      
    } else if (this.getOption('editor') === false) {

      this.hideEditor();
    }

    if (this.getOption('added')) {
      
      this.waitForVisibility(this);
    }
  };

  return 'views/content-snippet-view/render';

});