
/**
 * loadSnippets
 * Loads snippets to be handled later.
 *
 * Either loads a list of snippets, or a specific snippet, based upon what's
 * passed as arguments.  If a single snippet is requested, it'll load that
 * single one, otherwise it loads the snippets in the list, usually specified
 * by the index, which has been loaded and parsed upstream.
 *
 * @param list      {Array}   The list of snippets to load.
 * @param info      {Object}  Context around the request, and references.
 * @param category  {String}  The category of snippets to load.
 * @return                    None.
 */
module.exports = function loadSnippets (list, info, category) {
  var fs = require('fs');
  var parseSnippet = require('./parse-snippet');
  var updateIndex = require('./update-index');
  var _  = require('underscore');
  var i = 0;
  var target = list[info.specific - 1];
  
  function reportSnippets(error, data) {
      parseSnippet(error, data, info, category);
  }
  
  info.snippets = info.contentPath + '/snippets/';
  info.categories[category] = {
    currentIndex: 0
  };

  // If the snippet requested is above the bounds of the array, we must be 
  // requesting the guid of the snippet.  Usually this is for POSTs, 
  // which have this information, but it's available for some content requests
  // also, in certain circumstances, like what the Timeline needs, or for
  // RESTful urls.
  if (!target) {
    /**
     * findIndex
     * Determines if the specific snippet requested is within our list.
     *
     * This function is both a second-check to determine if we for some
     * reason have a mismatch between what's being requested and what we're
     * trying to load from the index (specific requests win over lists), 
     * and also used for updating existing snippets.
     *
     * @param index {Number}  The specific snippet index requested.
     * @return      {Boolean} True if there's a match.
     */
    target = _.find(list, function findIndex (index) {
      return index === info.specific;
    });
  }
  // If there was no match in the index, it must be new content, so it'll be
  // our target (to make).
  if (!target && info.req.method === 'POST') {
    info.setup.models[0].get('snippets').add(info.req.body);
    updateIndex(category, info);

    return;
  }
  
  if (typeof info.specific === 'number') {
    info.categories[category].totalFiles = 1;
    
    fs.readFile(info.snippets + target + '.json', 'utf8', reportSnippets);
    
  } else {
    info.categories[category].totalFiles = list.length;
    
    for (i; i < info.categories[category].totalFiles; i++) {
      fs.readFile(info.snippets + list[i] + '.json', 'utf8', reportSnippets);
    }
    
  }
};
