// Boilerplate for AMD and CJS isomorphism.
define('common/js/nooline/models/category/update-index', [], function () {

  var N = this.Nooline;

  N.Models.Category.prototype.updateIndex = function () {

    var info = this.get('info');
    var type = this.get('type');
    var fs = require('fs');
    var ContentSnippet = require('../content-snippet');
    var newIndex;
    var newSnippet = new ContentSnippet(info.req.body);

    this.listenTo(this.get('snippets'), 'saving:complete', this.notifyClient);

    if (info.indexList.categories[type].indexOf(info.specific) === -1) {

      info.indexList.categories[type].push(info.specific);
      info.indexList.count++;

      this.set('info', info);

    }

    this.set('filesUpdated', []);

    newIndex = JSON.stringify(this.get('info').indexList, null, '\t');

    // TODO: invert this binding, making the snippet collection listen for an
    // event on this model.
    this.get('snippets').add(newSnippet).trigger('saveSnippets', info);

    fs.writeFile(info.index, newIndex, (this.commitVersion).bind(this));

    return newIndex;

  };
});
