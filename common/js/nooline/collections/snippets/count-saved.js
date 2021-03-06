// Boilerplate for AMD and CJS isomorphism.
define('common/js/nooline/collections/snippets/count-saved',
  [],
  function () {

  var N = this.Nooline;

  N.Collections.Snippets.prototype.countSaved = function () {

    this.saved++;

    if (this.saved === this.length) {

      this.trigger('saving:complete', { saved: true });
    }

    return this.saved;
  };

});
