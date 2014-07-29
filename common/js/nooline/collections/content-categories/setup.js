// Boilerplate for AMD and CJS isomorphism.
define(
  'common/js/nooline/collections/content-categories/setup',
  [],
  function () {

  var N = this.Nooline;

  if (typeof document !== 'undefined') {

    var components = [
      'collections/content-categories/bind-events',
      'collections/content-categories/find-all-content',
      'collections/content-categories/load-models',
      'collections/content-categories/report-category',
      'collections/content-categories/render-categories'
    ];

    N.componentsLoading = N.componentsLoading.concat(components);

    require([
      'common/js/nooline/collections/content-categories/bind-events',
      'common/js/nooline/collections/content-categories/find-all-content',
      'common/js/nooline/collections/content-categories/load-models',
      'common/js/nooline/collections/content-categories/report-category',
      'common/js/nooline/collections/content-categories/render-categories'
    /**
     * removeLoaded
     * Remove loaded components from the queue.
     *
     * Once the components above are loaded, subtract them from the queue of
     * components still loading.  If there are none in the queue, trigger that
     * the loading of components is complete.
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

    // return function setup () {

      require('./bind-events');
      require('./load-models');
      require('./report-category');
      require('./render-categories');
    // };
  }

});
