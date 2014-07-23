// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/models/category/notify-client', [], function () {

  var N = this.Nooline;

  N.Models.Category.prototype.notifyClient = function (status) {
    var process;
    var repo;
    var exec;
    var files;
    var config;

    function commit (error) {
      if (error) { throw error; }

      var commitMessage = 'Content updated: ' + this.get('filesUpdated')[1];

      process = exec('git commit -m "' + commitMessage + '"', {
        cwd: repo
      }, push);

    }

    function push (error) {
      if (error) { throw error; }

      process = exec('git push', {
        cwd: repo
      }, logResults);

    }

    function logResults (error) {
      if (error) { throw error; }

      console.log('Content update successfully pushed:\n\t'
        + files.replace(' ', '\n\t')
      );
    }

    if (status.indexed) {

      this.set('indexed', true);
    }

    if (status.saved) {

      this.set('saved', true);
    }

    if (this.get('indexed') && this.get('saved')) {

      repo = this.get('repo');
      config = require(repo + '/config/site.json');
      exec = require('child_process').exec;
      files = this.get('filesUpdated').join(' ');

      if (config.mode !== 'debug') {

        process = exec('git add ' + files, {
          cwd: repo
        }, commit.bind(this));
      }

      this.get('info').res.send(200);
    }
  };

});
