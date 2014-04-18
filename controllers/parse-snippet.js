
/**
 * parseSnippet
 * Parses a snippet, and loads it into its category.
 *
 * This method is called on each snippet file, as specified upstream, either
 * from the index or a specific request.  The snippet is added to the 
 * category relevant to it, and some specific considerations are given to
 * Timeline snippets.  Finally, if all of the snippets have been loaded, and
 * all of the categories are loaded, we'll send the response back to the
 * client.
 *
 * @param error     {Object}  Likely unable to find a specific snippet file.
 * @param data      {String}  JSON containing the snippet content itself.
 * @param info      {Object}  Context object containing references.
 * @param category  {String}  The category to which the snippet will be added.
 * @return                    None.
 */
module.exports = function parseSnippet (error, data, info, category) {

  var error404 = require('../routes/error-404');

  var ContentSnippet = require('../common/js/nooline/models/content-snippet');

  var snippet;

  info.content = info.content || {};
  
  if (error) {
    // TODO: Add better error handling here, in case some snippets are present,
    // but not all.  Same goes for one below.
    error404(error, info);
  } else {
    try {
      data = JSON.parse(data);

      snippet = new ContentSnippet(data);
      
    } catch (fail) {
      error404(fail, info);
    }
    
    // Theoretically specific things could be needed for each category.
    // TODO: This should be abstracted away.  Look into this later.
    switch (category) {
      case 'timeline':
        info.setup.findWhere({type: category})
          .get('source').timeline.date.push(data);
        break;
      default:
        break;
    }

    info.setup.findWhere({type: category}).get('snippets').add(snippet);
    
    info.categories[category].currentIndex++;
    
    if (info.categories[category].currentIndex 
        === info.categories[category].totalFiles) {

      info.content[category] = info.setup.findWhere({type: category});
    
      info.categoriesLoaded++;
    }

    if (info.categoriesLoaded === info.categories.length) {
      
      if (info.specific) {
        info.content = info.content[category];
      }

      if (info.query) {
        info.res.send(JSON.stringify(info.content));
      }

      if (info.next) {
        info.next(info.content, info);
      }
    }
  }
};
