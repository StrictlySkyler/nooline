
define(function () {

  var N = window.Nooline;
  
  /**
   * waitForVisibility
   * For snippets in the Timeline, wait until visible.
   *
   * Sometimes, when they're loading, we need to wait until they're attached
   * to the DOM, which is currently handled by TimelineJS internals.  Thus,
   * we wait until they're visible, then bind to them.
   *
   * @param _this {Object}  The View for the ContentSnippet.
   * @return  None.
   */
  N.Views.ContentSnippetView.prototype.waitForVisibility = function (_this) {

    if (!_this.$el.is(':visible')
      || !_this.$el.find('.container').length
      && _this.model.get('type') === 'timeline') {

      requestAnimationFrame(function recurse () {
        _this.waitForVisibility(_this);
      });
    } else {

      _this.setOptions({
        editor: true,
        added: false,
        saved: false
      });
    }

  };

  return 'views/content-snippet-view/wait-for-visibility';

});
