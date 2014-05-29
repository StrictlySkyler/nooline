// Boilerplate for AMD and CJS isomorphism.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) { 
    exports = module.exports = func(); 
  } 
}).define('common/js/nooline/models/category/setup', [], function () {

  var N = this.Nooline;

  if (typeof document !== 'undefined') {
      
    var components = [
      'models/category/bind-events',
      'models/category/create-snippet',
      'models/category/load-collection',
      'models/category/load-meta',
      'models/category/load-index',
      'models/category/load-snippets',
      'models/category/report-snippets',
      'models/category/count-snippets'
    ];

    N.componentsLoading = N.componentsLoading || [];

    N.componentsLoading = N.componentsLoading.concat(components);

    require([
      'common/js/nooline/models/category/bind-events',
      'common/js/nooline/models/category/create-snippet',
      'common/js/nooline/models/category/load-collection',
      'common/js/nooline/models/category/load-meta',
      'common/js/nooline/models/category/load-index',
      'common/js/nooline/models/category/load-snippets',
      'common/js/nooline/models/category/report-snippets',
      'common/js/nooline/models/category/count-snippets'
    /**
     * removeLoaded
     * Remove loaded assets after loading.
     *
     * After we've finished loading the assets we need, remove them from the
     * queue of loading components, and if the queue is empty, notify the app
     * that all of the components are loaded.
     *
     * @return {undefined} None.
     */
    ], function removeLoaded () {

      N.componentsLoading = _.difference(N.componentsLoading, components);

      if (!N.componentsLoading.length) {
        
        N.$document.trigger('components:complete');
      }
    });
  } else {

    /**
     * setup
     * Loads the required modules for the server.  Being a returned function
     * allows the constructor to call and invoke this with a single line, e.g.:
     *   require('category/setup')();
     * 
     * @return None.
     */
    return function setup () {

      require('./bind-events');
      require('./load-collection');
      require('./load-meta');
      require('./load-index');
      require('./load-snippets');
      require('./report-snippets');
      require('./count-snippets');
    };
  }

});
