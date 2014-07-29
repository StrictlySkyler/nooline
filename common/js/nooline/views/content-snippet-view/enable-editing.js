
define('common/js/nooline/views/content-snippet-view/enable-editing',
  [],
  function () {

  var N = this.Nooline;

  /**
   * enableEditing
   * Allow editing for a snippet.
   *
   * Builds the appropriate elements, attaches them to the view, and reveals
   * them.
   *
   * @return  None.
   */
  N.Views.ContentSnippetView.prototype.enableEditing = function () {

    var buttonTag = '<button></button>';
    var panelTag = '<div></div>';
    var panelTextTag = '<span></span>';
    var headline = this.model.get('headline');

    var generalClassNames = ' control button content-snippet hidden';
    var panelClassNames = ' control button panel-control';
    var editClassNames = 'edit-content-button' + generalClassNames;
    var commitClassNames = 'commit-changes-button' + generalClassNames;
    var cancelEditingClassNames = 'cancel-editing-button' + generalClassNames;
    var unpublishClassNames = 'unpublish-content-button' + generalClassNames;
    var verifyButtonClassNames = 'verify-confirm' + panelClassNames;
    var cancelVerifyClassNames = 'verify-cancel' + panelClassNames;

    var verifyPanelClassNames = 'verify-panel hidden';
    var verifyTextClassNames = 'verify-text';

    var editText = 'Edit content: ' + headline;
    var commitText = 'Commit changes: ' + headline;
    var cancelText = 'Discard changes: ' + headline;
    var unpublishText = 'Unpublish content:' + headline;
    var verifyButtonText = 'Yep, do it!';
    var cancelVerifyButtonText = 'On second thought, nope.';

    var permissions = JSON.parse(sessionStorage.permissions);
    var allowedEdit = permissions['edit-content'];
    var allowedUnpublish = permissions['unpublish-content'];

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
        class: cancelEditingClassNames,
        title: cancelText
      })
      .html(cancelText);

    }

    if (!this.$unpublish) {

      this.$unpublish = $(buttonTag).attr({
        class: unpublishClassNames,
        title: unpublishText
      })
      .html(unpublishText);
    }

    if (!this.$verifyPanel) {

      this.$verifyPanel = $(panelTag).attr({
        class: verifyPanelClassNames
      });

      this.$verifyText = $(panelTextTag)
      .appendTo(this.$verifyPanel)
      .attr({
        class: verifyTextClassNames
      });

      this.$verifyButton = $(buttonTag)
      .appendTo(this.$verifyPanel)
      .attr({
        class: verifyButtonClassNames,
        title: verifyButtonText
      })
      .html(verifyButtonText);

      this.$cancelVerifyButton = $(buttonTag)
      .appendTo(this.$verifyPanel)
      .attr({
        class: cancelVerifyClassNames,
        title: cancelVerifyButtonText
      })
      .html(cancelVerifyButtonText);
    }

    if (allowedEdit) {

      this.$el.append(
        this.$edit,
        this.$commit,
        this.$cancel,
        this.$verifyPanel
      );

      this.$edit.removeClass('hidden');
    }

    if (allowedUnpublish) {

      this.$el.append(this.$unpublish);
      this.$unpublish.removeClass('hidden');
    }

  };

  // return 'views/content-snippet-view/enable-editing';

});
