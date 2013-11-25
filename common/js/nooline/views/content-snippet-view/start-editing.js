
define(function () {

  var N = window.Nooline;
  
  N.Views.ContentSnippetView.prototype.startEditing = function () {
    
    this.trigger('editor:enable');
  };

  return 'views/content-snippet-view/start-editing';

});