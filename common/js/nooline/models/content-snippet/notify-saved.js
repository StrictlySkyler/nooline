// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/models/content-snippet/notify-saved',
  [],
  function () {

  var N = this.Nooline;

  N.Models.ContentSnippet.prototype.notifySaved = function (error) {

    if (error) {
      console.error(error);

    } else {

      this.trigger('snippet:saved');
    }


  };

});
