
;(function buildBindEvents (N) {
  
  N.Models.ContentSnippet.prototype.bindEvents = function () {
    
    this.on({
      'login': this.enableEditing,

      'logout': this.disableEditing,

      'create': this.create
    });
  };

}(window.Nooline));