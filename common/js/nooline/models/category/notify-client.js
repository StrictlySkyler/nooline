// Boilerplate for AMD and CJS isomorphism.
define('common/js/nooline/models/category/notify-client', [], function () {

  var N = this.Nooline;

  N.Models.Category.prototype.notifyClient = function (status) {
    var repo;
    var files;

    if (status.indexed) {

      this.set('indexed', true);
    }

    if (status.saved) {

      this.set('saved', true);
    }

    if (this.get('indexed') && this.get('saved')) {

      repo = this.get('repo');
      files = this.get('filesUpdated');

      N.commitChanges(files, repo);

      this.get('info').res.send(200);
    }
  };

});
