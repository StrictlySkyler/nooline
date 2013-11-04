
;(function buildBindEvents (N) {
  
  N.Models.Category.prototype.bindEvents = function () {
    
    this.on({
      'create': this.createSnippet
    });
  };

}(window.Nooline));