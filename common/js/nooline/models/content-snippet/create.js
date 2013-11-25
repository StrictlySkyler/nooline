
define(function () {

  var N = window.Nooline;
  
  N.Models.ContentSnippet.prototype.create = function () {
    
    this.view.setOptions('create', true);
  };

  return 'models/content-snippet/create';

});