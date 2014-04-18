
/**
 * getIndex
 * Determines which content snippets to load.
 *
 * Parses the index, and then for each category, it loads the snippets
 * specified in the index.
 *
 * @param error {Object}  Couldn't load the index file, it seems!
 * @param data  {String}  JSON string containing the index object.
 * @param info  {Object}  Context object storing references and setup data.
 * @return                None.
 */
module.exports = function getIndex (error, data, info) {
  var loadSnippets = require('./load-snippets');
  var error404 = require('../routes/error-404');

  var i;
    
  if (error) {
    error404(error, info);
  } else {
    
    try {
      info.indexList = JSON.parse(data);

      for (i = 0; i < info.categories.length; i++) {
        loadSnippets(
          info.indexList.categories[info.categories[i]],
          info, 
          info.categories[i]
        );
      }
      
    } catch (fail) {
      error404(fail, info);
    }
  }
    
};
