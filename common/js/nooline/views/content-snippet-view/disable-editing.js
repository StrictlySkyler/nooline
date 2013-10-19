
;(function buildDisableEditing (N) {
  
  N.Views.ContentSnippetView.prototype.disableEditing = function () {

    var _this = this;
    
    this.hideEditor();

    this.$edit
      .addClass('hidden')
      // Since they all animate out at the same rate, listening to the last one
      // should suffice.
      .one(
        'transitionend webkitTransitionEnd',
        function removeControls () {

        _this.$commit.remove();
        _this.$cancel.remove();
        _this.$edit.remove();
    });
    

  };

}(window.Nooline));