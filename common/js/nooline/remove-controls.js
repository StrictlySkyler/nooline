
define(function () {
  var N = window.Nooline;
    
  N.removeControls = function removeControls () {

    var allSnippets = N.contentCategories.findAllContent();

    allSnippets.each(function notifyEachSnippet (snippet) {
      snippet.trigger('logout');
    });
    
  };
  
});