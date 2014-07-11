// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/models/content-snippet/bind-events',
  [],
  function () {

  var N = this.Nooline;

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

      'create': this.create,

      'save': this.save

    });
  };

  // For r.js assembly.
  // return 'models/content-snippet/bind-events';

});
