
define(function () {

  var N = window.Nooline;
  
  N.Models.Category.prototype.bindEvents = function () {
    
    this.on({
      'create': this.createSnippet
    });
  };

  return 'models/category/bind-events';

});