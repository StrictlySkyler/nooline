
define(function () {

  var N = window.Nooline;
  
  N.Models.ContentSnippet.prototype.bindEvents = function () {
    
    this.on({
      'login': this.enableEditing,

      'logout': this.disableEditing,

      'create': this.create

    });
  };

  return 'models/content-snippet/bind-events';

});