
define(function () {

  var N = window.Nooline;
  
  N.Views.ContentSnippetView.prototype.commitChanges = function () {

    this.trigger('editor:commit editor:disable');

  };

  return 'views/content-snippet-view/commit-changes';

});