
define(function () {

  var N = window.Nooline;
  
  N.Views.ContentSnippetView.prototype.stopEditing = function () {
    
    this.trigger('editor:disable');
  };

  return 'views/content-snippet-view/stop-editing';

});