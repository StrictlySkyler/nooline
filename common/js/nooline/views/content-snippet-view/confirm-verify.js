// Boilerplate to load this file in both CJS and AMD environs.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/views/content-snippet-view/confirm-verify',
  [],
  function () {

  var N = this.Nooline;

  N.Views.ContentSnippetView.prototype.confirmVerify = function () {

    var event = this.getOption('event');

    this.cancelVerify();

    this.trigger(event);

  };

});
