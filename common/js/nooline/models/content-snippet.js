
;(function buildContentSnippetModel () {
  
  var root = this;
  var N = root.Nooline;
  var Backbone = root.Backbone || require('backbone');
  var ContentSnippetView;

  var ContentSnippet = Backbone.Model.extend({
    constructor: function ContentSnippet () {

      var id;

      Backbone.Model.apply(this, arguments);

      if (typeof root.document !== 'undefined') {

        id = document.getElementById(this.get('uuid'));
        ContentSnippetView = N.Views.ContentSnippetView;

        this.bindEvents();

      } else {

        ContentSnippetView = require('../views/content-snippet-view');
        // Right now jQuery for node is out of date.
        // Current node version ~= 1.8.x
        // Current client version on Bower = ~= 2.0.x
        // When these versions reach parity, they should use the same source.
        // 2013-09-13
        Backbone.$ = require('jquery');
      }

      this.view = new ContentSnippetView({
        model: this,
        el: id
      });

    }
  });

  if (typeof module !== 'undefined') {

    module.exports = ContentSnippet;
  } else {

    N.Models = N.Models || {};
    N.Models.ContentSnippet = ContentSnippet;

    require(['nooline/models/content-snippet/setup']);

  }

}).call(this);