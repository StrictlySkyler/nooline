
define(function () {

  var N = window.Nooline;
  
  N.Views.ContentSnippetView.prototype.getOption = function (option) {
    
    return this.options[option];

  };

  return 'views/content-snippet-view/get-option';

});