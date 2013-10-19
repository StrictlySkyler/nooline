
;(function buildRemoveControls (N) {
  
  N.removeControls = function removeControls () {

    var allSnippets = N.contentCategories.findAllContent();

    allSnippets.each(function notifyEachSnippet (snippet) {
      snippet.trigger('logout');
    });
    
  };
  
}(window.Nooline));