
define('common/js/nooline/views/content-snippet-view/disable-editing',
  [],
  function () {

  var N = this.Nooline;

  /**
   * disableEditing
   * Turn off editing.
   *
   * Disables the ability to edit a ContentSnippet.
   *
   * @return  None.
   */
  N.Views.ContentSnippetView.prototype.disableEditing = function () {

    var _this = this;

    this.hideEditor();

    this.$edit
      .addClass('hidden')
      // Since they all animate out at the same rate, listening to the last one
      // should suffice.
      .one(
        'transitionend webkitTransitionEnd',
        /**
         * removeControls
         * Animate out the controls for editing.
         *
         * Removes them from the DOM when finished.
         *
         * @return  None.
         */
        function removeControls () {

        _this.$commit.remove();
        _this.$cancel.remove();
        _this.$edit.remove();
        _this.$unpublish.remove();
    });


  };

  // return 'views/content-snippet-view/disable-editing';

});
