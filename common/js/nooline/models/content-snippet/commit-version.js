// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/models/content-snippet/commit-version',
  [],
  function () {

  var N = this.Nooline;

  N.Models.ContentSnippet.prototype.commitVersion = function (error) {

    var snippet = this.get('index') + '.json';
    var update = 'Snippet updated: ' + snippet;
    var file = 'content/snippets/' + snippet;

    if (error) {
      console.error(error);

    } else {

      console.log(update);

      this.collection.parent.get('filesUpdated').push(file);

      this.notifySaved();

    }


  };

});
