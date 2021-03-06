// Boilerplate to load this file in both CJS and AMD environs.
define('common/js/nooline/views/content-snippet-view/cancel-verify',
  [],
  function () {

  var N = this.Nooline;

  N.Views.ContentSnippetView.prototype.cancelVerify = function () {

    this.$el.removeClass('verify');

    this.$verifyPanel.addClass('hidden');

    this.setOptions({
      verify: false,
      message: undefined,
      event: undefined
    });

    this.$verifyText.html('');

  };

});
