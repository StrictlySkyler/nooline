
;(function buildContentSnippetView () {
  
  var root = this;
  var N = root.Nooline;
  var Backbone = root.Backbone || require('backbone');

  var ContentSnippetView = Backbone.View.extend({
    constructor: function ContentSnippetView () {
      var _this = this;

      Backbone.View.apply(this, arguments);

      if (typeof module === 'undefined') {
        this.bindEvents();  
      }
    }
  });

  if (typeof module !== 'undefined') {

    module.exports = ContentSnippetView;

  } else {

    N.Views = N.Views || {};
    N.Views.ContentSnippetView = ContentSnippetView;
    require(['nooline/views/content-snippet-view/setup']);

  }

}).call(this);