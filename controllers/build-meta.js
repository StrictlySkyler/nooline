
/**
 * buildMeta
 * Collects and builds the metadata about a category.
 *
 * This method will be called once for each category requested by the client.
 * It uses "group" async handling to aggregate the categories as data, and
 * then checks to see if all of the categories have finished loading.  If
 * they have, it reports the index containing which snippets of content
 * should be loaded.
 *
 * @param error {Object}  Error object; usually exists if no content exists
 *                        but the site does exist.
 * @param data  {Object}  The category being loaded.
 * @param info  {Object}  Context about the content request.
 * @return                None.
 */
module.exports = function buildMeta (error, data, info) {
  
  var fs = require('fs');
  var getIndex = require('./get-index');
  var error404 = require('../routes/error-404');
  
  var Snippets = require('../common/js/nooline/collections/snippets');
  var Category = require('../common/js/nooline/models/category');

  var errorMessage = 'No content found for: ' + info.domain
    + '\n  Usually this is because the domain is wrong.'
    + '\n  Check your hosts file, and that this domain folder has content.';
  
  /**
   * reportIndex
   * Once the content category has been built with the appropriate metadata,
   * go grab the index containing the content snippets we want to load.
   *
   * @param error {Object}  Error object; index file must be missing?
   * @param data  {String}  JSON string containing the index object.
   * @return                None.
   */
  function reportIndex (error, data) {
    getIndex(error, data, info);
  }
  
  info.index = info.contentPath + '/index.json';
  
  if (error) {
    console.error(errorMessage);
    error404(error, info);
  } else {
    try {
      data = new Category(JSON.parse(data));

      data.set('snippets', new Snippets());
      
      info.setup.add(data);

      info.metaLoaded++;

    } catch (fail) {
      error404(fail, info);
    }

    if (info.metaLoaded === info.categories.length) {

      info.categoriesLoaded = 0;

      fs.readFile(info.index, 'utf8', reportIndex);

    }
    
  }
};
