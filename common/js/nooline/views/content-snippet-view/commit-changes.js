
define('common/js/nooline/views/content-snippet-view/commit-changes',
  [],
  function () {

  var N = this.Nooline;

  /**
   * commitChanges
   * Save the changes the user made.
   *
   * This commits the current state of the editable content snippet to the
   * data model, and disables editing on that snippet.  That content will
   * then be saved to storage.
   *
   * @return  None.
   */
  N.Views.ContentSnippetView.prototype.commitChanges = function () {

    this.trigger('editor:commit editor:disable');

  };

  // return 'views/content-snippet-view/commit-changes';

});
