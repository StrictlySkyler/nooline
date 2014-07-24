
module.exports = function putSnippet (req, res) {

  var ContentSnippet = require(__root
    + '/common/js/nooline/models/content-snippet'
  );
  var N = GLOBAL.Nooline;

  var snippet = new ContentSnippet(req.body);
  var contentPath = __root + '/sites/' + req.host + '/content/';
  var snippetSaved = false;
  var indexSaved = false;

  var info = {
    snippets: contentPath + 'snippets/',
    index: contentPath + 'index.json'
  };

  // TODO: probably move this event listening to the snippet itself.
  function checkComplete() {

    if (snippetSaved && indexSaved) {

      N.commitChanges([
        info.index,
        info.snippets + snippet.get('index') + '.json'],
        req.host
      );

      res.send(200);
    }

  }

  snippet.on('snippet:unpublished', function updateIndexStatus () {

    indexSaved = true;

    checkComplete();
  });

  snippet.on('snippet:saved', function updateSnippetStatus () {

    snippetSaved = true;

    checkComplete();
  });

  snippet.save(info);

  if (!snippet.get('published')) {

    snippet.unpublish(info);
  }

};
