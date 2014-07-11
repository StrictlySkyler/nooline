// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/models/category/commit-version', [], function () {

  var N = this.Nooline;

  N.Models.Category.prototype.commitVersion = function (error) {

    // TODO: Add versioning here.
    // Cross-reference against when snippet is saved.
    var update = 'Index updated:  \n'
      +'  Category: ' + this.get('type') + '\n'
      +'  Snippet: ' + this.get('info').specific;

    if (error) {
      console.error(error);
    } else {

      console.log(update);
      this.notifyClient({ committed: true });
    }
  };

});
