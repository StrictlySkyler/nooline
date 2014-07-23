// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/models/content-snippet/setup', [], function () {

  var N = this.Nooline;

  if (typeof document !== 'undefined') {

    var components = [
      'models/content-snippet/bind-events',
      'models/content-snippet/enable-editing',
      'models/content-snippet/disable-editing',
      'models/content-snippet/create',
      'models/content-snippet/remove'
    ];

    N.componentsLoading = N.componentsLoading.concat(components);

    require([
      'common/js/nooline/models/content-snippet/bind-events',
      'common/js/nooline/models/content-snippet/enable-editing',
      'common/js/nooline/models/content-snippet/disable-editing',
      'common/js/nooline/models/content-snippet/create',
      'common/js/nooline/models/content-snippet/remove'
    /**
     * removeLoaded
     * Remove loaded components from the queue.
     *
     * Once they've loaded, remove them from the queue, and notify the app if
     * there is nothing left in the queue.
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
      require('./create');
      require('./remove');
      require('./save');
      require('./notify-saved');
      require('./commit-version');
    };
  }

});
