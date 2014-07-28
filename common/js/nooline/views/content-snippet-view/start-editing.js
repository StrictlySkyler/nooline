
define('common/js/nooline/views/content-snippet-view/start-editing',
  [],
  function () {

  var N = this.Nooline;

  /**
   * startEditing
   * Notify the View to start editing.
   *
   * Triggers an event on the view that we're going to start editing it.
   *
   * @return
   */
  N.Views.ContentSnippetView.prototype.startEditing = function () {

    this.trigger('editor:enable');
  };

  // return 'views/content-snippet-view/start-editing';

});
