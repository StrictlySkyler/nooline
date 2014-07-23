// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/collections/snippets/setup', [], function () {

  var N = this.Nooline;

  if (typeof document !== 'undefined') {

    var components = [
      'collections/snippets/bind-events'
    ];

    N.componentsLoading = N.componentsLoading.concat(components);

    require([
      'common/js/nooline/collections/snippets/bind-events'
    /**
     * removeLoaded
     * Remove loaded components from the queue.
     *
     * Subtract any components finished from the loading queue, and notify the
     * app if there are none left.
     *
     * @return  None.
     */
    ], function removeLoaded () {

      N.componentsLoading = _.difference(N.componentsLoading, components);

      if (!N.componentsLoading.length) {
        N.$document.trigger('components:complete');
      }
    });

  } else {

    return function setup () {

      require('./bind-events');
      require('./save-snippets');
      require('./count-saved');
    };
  }

});
