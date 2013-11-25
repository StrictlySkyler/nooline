
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) { 
    exports = module.exports = func(); 
  } 
}).define('common/js/nooline/collections/snippets', [], function (){
    
  var root = this;
  var N = root.window ? root.Nooline : null;
  var Backbone = root.Backbone || require('backbone');

  var Snippets = Backbone.Collection.extend({
    constructor: function Snippets () {
      Backbone.Collection.apply(this, arguments);

      if (typeof module === 'undefined') {
        this.bindEvents();
      }
    },
    comparator: function (a, b) {

      if (a.get('index') < b.get('index')) {
        return 1;
      }
    }
  });

  if (typeof module !== 'undefined') {

    module.exports = Snippets;
    return module.exports;

  } else {

    N.Collections = N.Collections || {};
    N.Collections.Snippets = Snippets;

    require(['common/js/nooline/collections/snippets/setup']);

  }
    
  return 'collections/snippets';
});