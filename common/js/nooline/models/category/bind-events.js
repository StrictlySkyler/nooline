
define(function () {

  var N = window.Nooline;
  
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
      'create': this.createSnippet
    });
  };

  // For r.js.
  return 'models/category/bind-events';

});
