
;(function buildBindEvents (N) {
  
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

}(window.Nooline));