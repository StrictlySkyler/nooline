
define(function (){
  
  var N = window.Nooline;
    
  var components = [
    'collections/content-categories/bind-events',
    'collections/content-categories/find-all-content'
  ];

  N.componentsLoading = N.componentsLoading || [];

  N.componentsLoading = N.componentsLoading.concat(components);

  require([
    'common/js/nooline/collections/content-categories/bind-events',
    'common/js/nooline/collections/content-categories/find-all-content'
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

});
