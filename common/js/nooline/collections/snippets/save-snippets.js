// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/collections/snippets/save-snippets',
  [],
  function () {

  var N = this.Nooline;

  N.Collections.Snippets.prototype.saveSnippets = function (info) {

    this.saved = 0;

    return this.each(function (snippet) {

      snippet.trigger('save', info);
    });
  };

});
