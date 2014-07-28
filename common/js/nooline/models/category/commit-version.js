// Boilerplate for AMD and CJS isomorphism.
define('common/js/nooline/models/category/commit-version', [], function () {

  var N = this.Nooline;

  N.Models.Category.prototype.commitVersion = function (error) {

    var repo = this.get('info').domain;
    var update = 'Index updated:  \n'
      +'\tCategory: ' + this.get('type') + '\n'
      +'\tSnippet: ' + this.get('info').specific;
    var index = 'content/index.json';

    this.set('repo', repo);

    if (error) {
      console.error(error);
    } else {

      console.log(update);

      this.get('filesUpdated').push(index);

      this.notifyClient({ indexed: true });
    }
  };

});
