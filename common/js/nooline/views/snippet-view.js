
;(function buildSnippetView () {
  
  var root = this;
  var N = root.Nooline;
  var Backbone = root.Backbone || require('backbone');

  var SnippetView = Backbone.View.extend({
    constructor: function SnippetView () {
      var _this = this;

      Backbone.View.apply(this, arguments);
      
      if (!this.$el.attr('id') &&
          root.document !== undefined) {
        
        $(document).on(this.model.get('uuid'), function (e, $el) {
          $(document).off(e.type);

          _this.setElement($el);
        });
      }
    }
  });

  if (typeof module !== 'undefined') {

    module.exports = SnippetView;

  } else {

    N.Views = N.Views || {};
    N.Views.SnippetView = SnippetView;

  }

}).call(this);