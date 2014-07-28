// Boilerplate to load this file in both CJS and AMD environs.
define('common/js/nooline/views/content-snippet-view/unpublish-content',
  [],
  function () {

  var N = this.Nooline;

  N.Views.ContentSnippetView.prototype.unpublishContent = function () {

    var message = 'Unpublish: "' + this.model.get('headline') + '"?';

    this.setOptions({
      verify: true,
      message: message,
      event: 'unpublish'
    });

  };

});
