
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/views/content-snippet-view/show-editor',
  [],
  function () {

  var N = this.Nooline;

  /**
   * showEditor
   * Show the WYSIWYG editor.
   *
   * Enable the editor and editing features on the content snippet the user
   * is trying to edit.
   *
   * @return  None.
   */
  N.Views.ContentSnippetView.prototype.showEditor = function () {

    var id = this.$el.attr('id');
    var offset = 0;

    this.$editableElement = this.$el.children('#' + id + '-article');

    this.$el.addClass('editing');

    this.$editableElement.attr('contenteditable', true);

    if (!CKEDITOR.instances[this.model.get('uuid') + '-article']) {
      CKEDITOR.inline(this.$editableElement.attr('id'), {
        customConfig: '/common/js/nooline/config/ckeditor/config.js',
        floatSpaceDockedOffsetY: offset
      });
    }

    this.$edit.addClass('hidden');
    this.$unpublish.addClass('hidden');

    this.$commit.removeClass('hidden');
    this.$cancel.removeClass('hidden');
  };

  // return 'views/content-snippet-view/show-editor';

});
