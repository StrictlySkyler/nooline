
define(function (){

  var N = window.Nooline;
    
  var components = [
    'collections/snippets/bind-events'
  ];

  N.componentsLoading = N.componentsLoading || [];

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

});
