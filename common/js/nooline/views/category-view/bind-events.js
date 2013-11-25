
define(function () {

  var N = window.Nooline;
  
  N.Views.CategoryView.prototype.bindEvents = function () {

    var _this = this;

    this.$el.on('click', '.create-content', function () {
      _this.createSnippet();
    });
    
    this.on({
      'options:change': function renderChanges () {
        
        this.render();
      }
    });

  };

  return 'views/category-view/bind-events';

});