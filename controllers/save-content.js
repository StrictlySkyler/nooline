
/**
 * saveContent
 * Save some content, now updated.
 *
 * Called when content is updated on the client, after we load it.  Notifies
 * the client if all went OK.
 *
 * @param category  {String}  The category of content we're updating.
 * @param info      {Object}  Context object containing references.
 * @return                    None.
 */
module.exports = function saveContent (category, info) {
  var snippets = category.get('snippets');
  var fs = require('fs');
  var path;

  /**
   * notifyClient
   * Sends the response to the client.
   *
   * Called after an attempt to write out the content.
   *
   * @param error {Object}  Permissions error, likely.
   * @return                None.
   */
  function notifyClient (error) {
    // TODO: Add versioning here.  
    // Cross-reference against when index is updated.
    if (error) {
      console.error(error);
    } else {
      console.log('Content saved: ' + path);
      info.res.send(200);
    }
  }

  /**
   * setNewData
   * Sets the new content on the snippet model.
   *
   * New content comes from the POST request body.
   *
   * @param snippet {Object}  The snippet we're updating.
   * @return                  None.
   */
  snippets.each(function setNewData (snippet) {
    var content;
    path = './sites/' 
      + info.domain 
      + '/content/snippets/' 
      + info.specific 
      + '.json';
    snippet.set(info.req.body);
    snippet.set({
      index: info.specific,
      url: '/' + snippet.get('type') + '/' + info.specific
    });

    content = JSON.stringify(snippet.toJSON(), null, '\t');
    
    fs.writeFile(path, content, notifyClient);
  });

};
