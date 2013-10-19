
;(function buildSnippetsCollection () {
  
  var root = this;
  var N = root.Nooline;
  var Backbone = root.Backbone || require('backbone');

  var Snippets = Backbone.Collection.extend({
    constructor: function Snippets () {
      Backbone.Collection.apply(this, arguments);

      if (typeof module === 'undefined') {
        this.bindEvents();
      }
    }
  });

  if (typeof module !== 'undefined') {

    module.exports = Snippets;

  } else {

    N.Collections = N.Collections || {};
    N.Collections.Snippets = Snippets;

    require(['nooline/collections/snippets/setup']);

  }
  
}).call(this);