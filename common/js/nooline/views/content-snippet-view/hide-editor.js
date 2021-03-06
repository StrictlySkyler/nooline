
define('common/js/nooline/views/content-snippet-view/hide-editor',
  [],
  function () {

  var N = this.Nooline;

  /**
   * hideEditor
   * Hide the WYSIWYG.
   *
   * If the WYSIWYG editor is present, hide it, and cleanup after it.
   *
   * @return  None.
   */
  N.Views.ContentSnippetView.prototype.hideEditor = function () {

    var editor;

    if (this.$editableElement) {
      this.$editableElement.attr('contenteditable', false);
      editor = CKEDITOR.instances[this.$editableElement.attr('id')];
    }

    if (editor) {
      editor.destroy();
    }

    // TODO: Invert this, triggering an event here to which the model listens,
    // and let the view remove itself.
    if (this.getOption('saved') === false && this.model) {
      this.model.remove();
    }

    this.$el.removeClass('editing');

    this.$commit.addClass('hidden');
    this.$cancel.addClass('hidden');

    this.$edit.removeClass('hidden');
    this.$unpublish.removeClass('hidden');

  };

  // return 'views/content-snippet-view/hide-editor';

});
