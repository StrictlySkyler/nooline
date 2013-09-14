
;(function buildContentSnippetModel () {
  
  var root = this;
  var N = root.Nooline;
  var Backbone = root.Backbone || require('backbone');
  var SnippetView;

  var ContentSnippet = Backbone.Model.extend({
    constructor: function ContentSnippet () {

      var id;

      Backbone.Model.apply(this, arguments);

      if (typeof root.document !== 'undefined') {

        id = document.getElementById(this.get('uuid'));
        SnippetView = N.Views.SnippetView;

      } else {

        SnippetView = require('../views/snippet-view');
        // Right now jQuery for node is out of date.
        // Current node version ~= 1.8.x
        // Current client version on Bower = ~= 2.0.x
        // When these versions reach parity, they should use the same source.
        // 2013-09-13
        Backbone.$ = require('jquery');
      }

      this.view = new SnippetView({
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

  }

}).call(this);