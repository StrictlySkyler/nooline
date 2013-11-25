
define(function () {

  var N = window.Nooline;
  
  N.Views.ContentSnippetView.prototype.enableEditing = function () {

    var buttonTag = '<button></button>';
    var generalClassNames = ' control button content-snippet hidden';
    var editClassNames = 'edit-content-button' + generalClassNames;
    var commitClassNames = 'commit-changes-button' + generalClassNames;
    var cancelClassNames = 'cancel-editing-button' + generalClassNames;
    var editText = 'Edit content: ' + this.model.get('headline');
    var commitText = 'Commit changes: ' + this.model.get('headline');
    var cancelText = 'Discard changes: ' + this.model.get('headline');
    
    if (!this.$edit) {
      this.$edit = $(buttonTag).attr({
        class: editClassNames,
        title: editText
      })
      .html(editText);

      this.$commit = $(buttonTag).attr({
        class: commitClassNames,
        title: commitText
      })
      .html(commitText);

      this.$cancel = $(buttonTag).attr({
        class: cancelClassNames,
        title: cancelText
      })
      .html(cancelText);

    }

    this.$el.append(this.$edit, this.$commit, this.$cancel);
    this.$edit.removeClass('hidden');

  };

  return 'views/content-snippet-view/enable-editing';

});