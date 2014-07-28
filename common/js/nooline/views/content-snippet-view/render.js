
define('common/js/nooline/views/content-snippet-view/render',
  [],
  function () {

  var N = this.Nooline;

  /**
   * render
   * Show updates from the Model.
   *
   * Renders out any updates from the ContentSnippet Model to the DOM,
   * including the ability to edit.
   *
   * @return  None.
   */
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

    if (this.getOption('verify')) {

      this.verify();
    }
  };

  // return 'views/content-snippet-view/render';

});
