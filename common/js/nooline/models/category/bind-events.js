define('common/js/nooline/models/category/bind-events', [], function () {

  var N = this.Nooline;
  
  /**
   * bindEvents
   * Attach event listeners.
   *
   * Any events we might need for the Category Model, such as creation of a
   * new Snippet.
   *
   * @return  None.
   */
  N.Models.Category.prototype.bindEvents = function () {
    
    this.on({
      'create': this.createSnippet,
      'collection:loaded': this.reportSnippets,
      'snippet:loaded': this.countSnippets
    });
  };

});
