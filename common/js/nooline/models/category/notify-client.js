// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/models/category/notify-client', [], function () {

  var N = this.Nooline;

  N.Models.Category.prototype.notifyClient = function (status) {
    var branch;
    var repo;

    function commit (error) {
      if (error) { throw error; }

      repo.commit('User content update.', push);
    }

    function push (error) {
      if (error) { throw error; }

      repo.branches(function (error, branches) {
        if (error) { throw error; }

        branch = branches.current;

        console.log('Pushing branch:', branch, '\n\tto repo:', repo.name);

        repo.push('origin', branch, function (error) {
          if (error) { throw error; }

          console.log("Successful push:", repo.name);
        });
      });
    }

    if (status.indexed) {

      this.set('indexed', true);
    }

    if (status.saved) {

      this.set('saved', true);
    }

    if (this.get('indexed') && this.get('saved')) {

      repo = this.get('repo');

      repo.add(this.get('filesUpdated'), commit);

      this.get('info').res.send(200);
    }
  };

});
