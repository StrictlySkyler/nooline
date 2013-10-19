
;(function buildCommitChanges (N) {
  
  N.Views.ContentSnippetView.prototype.commitChanges = function (e) {

    e.data.this.trigger('editor:commit');
    e.data.this.trigger('editor:disable');

  };

}(window.Nooline));