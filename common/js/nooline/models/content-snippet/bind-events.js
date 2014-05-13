
define(function () {

  var N = window.Nooline;
  
  /**
   * bindEvents
   * Attach event listeners to the model.
   *
   * These event listeners handle things to which the model should react.
   * Usually this orients around manipulating the content.
   *
   * @return  None.
   */
  N.Models.ContentSnippet.prototype.bindEvents = function () {
    
    this.on({
      'login': this.enableEditing,

      'logout': this.disableEditing,

      'create': this.create

    });
  };

  // For r.js assembly.
  return 'models/content-snippet/bind-events';

});
