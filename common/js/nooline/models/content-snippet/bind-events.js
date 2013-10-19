
;(function buildBindEvents (N) {
  
  N.Models.ContentSnippet.prototype.bindEvents = function () {
    
    this.on({
      'login': this.enableEditing,

      'logout': this.disableEditing,

      'change': function () {
        
      }
    });
  };

}(window.Nooline));