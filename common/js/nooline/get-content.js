
;(function loadGetContent(N) {

  function parseContent (content) {

    content = JSON.parse(content);

    var category = new Category({
      type: content.type
    });

    var snippets = new Snippets(content.snippets, {
      model: ContentSnippet
    });

    category.set('snippets', snippets);

    N.contentCategories.add(category);

  }

  var ContentCategories = Backbone.Collection.extend({
    constructor: function ContentCategories () {
      Backbone.Collection.apply(this, arguments);
    }
  });

  var Category = Backbone.Model.extend({
    constructor: function Category () {
      Backbone.Model.apply(this, arguments);
    }
  });

  var Snippets = Backbone.Collection.extend({
    constructor: function Snippets () {
      Backbone.Collection.apply(this, arguments);
    }
  });

  var ContentSnippet = Backbone.Model.extend({
    constructor: function ContentSnippet () {

      Backbone.Model.apply(this, arguments);

      this.view = new SnippetView({
        model: this,
        el: document.getElementById(this.get('uuid'))
      });

    }
  });

  var SnippetView = Backbone.View.extend({
    constructor: function SnippetView () {
      var _this = this;

      Backbone.View.apply(this, arguments);
      
      if (!this.$el.attr('id')) {

        $(document).on(this.model.get('uuid'), function (e, $el) {
          $(document).off(e.type);

          _this.setElement($el);
        });
      }
    }
  });

  N.getContent = function (meta, next) {
    
    $.get('/content', meta, [next, parseContent]);
  };

  N.contentCategories = new ContentCategories();
  
}(window.Nooline));