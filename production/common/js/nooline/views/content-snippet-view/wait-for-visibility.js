
;(function buildCreate (N) {
  
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

}(window.Nooline));