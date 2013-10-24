
;(function buildCreate (N) {
  
  N.Views.ContentSnippetView.prototype.create = function () {

    var category = this.model.get('type');
    var $el;
    var $article;
    var headline = '<h3 class="headline">' 
      + this.model.get('headline') 
      + '</h3>';
    var text = '<p class="text">' + this.model.get('text') + '</p>';

    if (this.model.get('type') === 'timeline') {
      $('#narrative').remove();

      N.buildTimeline(this.model.collection.category.attributes);
    } else {

      $article = $('<article></article>').attr({
        id: this.model.get('uuid') + '-article'
      }).html(headline + text);

      $el = $('<div></div>').attr({
        id: this.model.get('uuid'),
        class: 'snippet'
      }).append($article);

      $('#' + category + '-controls').after($el);

      this.setElement($el);

      this.bindEvents($el);
    }

    this.setOptions({
      create: false,
      editable: true,
      added: true
    });

  };

}(window.Nooline));