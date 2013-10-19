
;(function buildHideEditor (N) {
  
  N.Views.ContentSnippetView.prototype.hideEditor = function () {

    var editor;
    var _this = this;

    if (this.$editableElement) {
      this.$editableElement.attr('contenteditable', false);
      editor = CKEDITOR.instances[this.$editableElement.attr('id')];
    }

    if (editor) {
      editor.destroy();
    }

    this.$el.removeClass('editing');

    this.$commit.addClass('hidden');

    this.$cancel.addClass('hidden');

    this.$edit.removeClass('hidden')

  }

}(window.Nooline));