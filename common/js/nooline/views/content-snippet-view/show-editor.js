
;(function buildShowEditor (N) {
  
  N.Views.ContentSnippetView.prototype.showEditor = function () {

    var id = this.$el.attr('id');
    var offset;

    if (this.model.get('type') === 'timeline') {

      this.$editableElement = this.$el.find('.container').attr({
        id: id + '-container'
      });

      offset = 100;

    } else {

      this.$editableElement = this.$el.children('#' + id + '-article');

      offset = 0;
    }

    this.$el.addClass('editing');

    this.$editableElement.attr('contenteditable', true);

    CKEDITOR.inline(this.$editableElement.attr('id'), {
      customConfig: '/common/js/nooline/config/ckeditor/config.js',
      floatSpaceDockedOffsetY: offset
    });

    this.$edit.addClass('hidden');

    this.$commit.removeClass('hidden');

    this.$cancel.removeClass('hidden');
  }

}(window.Nooline));