// Boilerplate for AMD and CJS isomorphism.
define('common/js/nooline/views/category-view/setup', [], function () {
  var N = this.Nooline;

  if (typeof document !== 'undefined') {

    var components = [
      'views/category-view/bind-events',
      'views/category-view/create-snippet',
      'views/category-view/render'
    ];

    N.componentsLoading = N.componentsLoading.concat(components);

    require([
      'common/js/nooline/views/category-view/bind-events',
      'common/js/nooline/views/category-view/create-snippet',
      'common/js/nooline/views/category-view/render'
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

      require('./bind-events');
      require('./create-snippet');
      require('./render');

  }

});
