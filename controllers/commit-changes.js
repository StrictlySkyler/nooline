
Nooline.commitChanges = function (files, repo) {

  var process;
  var exec = require('child_process').exec;
  var config = require(__root + '/sites/' + repo + '/config/site.json');
  var filesString = files.join(' ');
  var directory = __root + '/sites/' + repo;
  debugger;

  function commit (error) {
    if (error) { throw error; }

    var commitMessage = 'Content updated: ' + files;

    process = exec('git commit -m "' + commitMessage + '"', {
      cwd: directory
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

  if (config.mode !== 'debug') {

    process = exec('git add ' + filesString, {
      cwd: directory
    }, commit);
  }
};
