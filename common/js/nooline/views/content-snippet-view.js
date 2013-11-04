
({ define: typeof define === "function"
  ? define
  : function(A,F) { 
    exports = module.exports = F(); 
  } 
}).define("common/js/nooline/views/content-snippet-view", function(){
  return (function buildContentSnippetView () {
    
    var root = this;
    var N = root.Nooline;
    var Backbone = root.Backbone || require('backbone');

    var ContentSnippetView = Backbone.View.extend({
      constructor: function ContentSnippetView () {

        var element;

        Backbone.View.apply(this, arguments);

        if (typeof module === 'undefined') {

          this.options = {};

          element = document.getElementById(this.model.get('uuid'));

          this.bindEvents(element);
        }
      }
    });

    if (typeof module !== 'undefined') {

      module.exports = ContentSnippetView;
      return module.exports;

    } else {

      N.Views = N.Views || {};
      N.Views.ContentSnippetView = ContentSnippetView;
      require(['common/js/nooline/views/content-snippet-view/setup']);

    }

  }).call(this);
});