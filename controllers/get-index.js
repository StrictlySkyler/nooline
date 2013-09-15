
module.exports = function getIndex (error, data, info) {
  var loadSnippets = require('./load-snippets');
  var error404 = require('../routes/error-404');

  var i;
    
  if (error) {
    error404(error, info);
  } else {
    
    try {
      data = JSON.parse(data);

      for (i = 0; i < info.categories.length; i++) {
        loadSnippets(
          data[info.categories[i]],
          info, 
          info.categories[i]
        );
      }
      
    } catch (fail) {
      error404(fail, info);
    }
  }
    
};