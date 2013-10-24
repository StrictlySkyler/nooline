
;(function buildCommitChanges (N) {
  
  N.Views.ContentSnippetView.prototype.commitChanges = function () {

    this.trigger('editor:commit editor:disable');

  };

}(window.Nooline));