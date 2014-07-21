// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/models/content-snippet/save', [], function () {

  var N = this.Nooline;

  N.Models.ContentSnippet.prototype.save = function (info) {

    var fs = require('fs');
    var file = info.snippets + this.get('index') + '.json';
    var snippet = JSON.stringify(this.toJSON(), null, '\t');

    console.log('Saving file: \n\t' + file);

    fs.writeFile(file, snippet, (this.commitVersion).bind(this));
  };

});
