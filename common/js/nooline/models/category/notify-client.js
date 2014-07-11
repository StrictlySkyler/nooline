// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/models/category/notify-client', [], function () {

  var N = this.Nooline;

  N.Models.Category.prototype.notifyClient = function (status) {

    if (status.committed) {

      this.set('committed', true);
    }

    if (status.saved) {

      this.set('saved', true);
    }

    if (this.get('committed') && this.get('saved')) {

      this.get('info').res.send(200);
    }
  };

});
