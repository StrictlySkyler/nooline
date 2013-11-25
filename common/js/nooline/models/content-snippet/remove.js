
define(function () {

  var N = window.Nooline;
  
  N.Models.ContentSnippet.prototype.remove = function () {
    
    this.collection.remove(this).view.trigger('remove');

    delete this.view;
    
  };

  return 'models/content-snippet/remove';

});