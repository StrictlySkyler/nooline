
define(function () {
  var N = window.Nooline;
    
  var components = [
    'models/category/bind-events',
    'models/category/create-snippet'
  ];

  N.componentsLoading = N.componentsLoading || [];

  N.componentsLoading = N.componentsLoading.concat(components);

  require([
    'common/js/nooline/models/category/bind-events',
    'common/js/nooline/models/category/create-snippet'
  /**
   * removeLoaded
   * Remove loaded assets after loading.
   *
   * After we've finished loading the assets we need, remove them from the
   * queue of loading components, and if the queue is empty, notify the app
   * that all of the components are loaded.
   *
   * @return
   */
  ], function removeLoaded () {

    N.componentsLoading = _.difference(N.componentsLoading, components);

    if (!N.componentsLoading.length) {
      
      N.$document.trigger('components:complete');
    }
  });

});
