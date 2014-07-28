// Boilerplate to load this file in both CJS and AMD environs.
define('common/js/nooline/views/content-snippet-view/verify',
  [],
  function () {

  var N = this.Nooline;

  N.Views.ContentSnippetView.prototype.verify = function () {

    this.$el.addClass('verify');

    this.$verifyPanel.removeClass('hidden');

    this.$verifyText.html(this.getOption('message'));

  };

});
