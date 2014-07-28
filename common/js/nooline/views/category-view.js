
define('common/js/nooline/views/category-view', [
  'node_modules/backbone/backbone'
  ], function () {

  var root = this;
  var N = root.Nooline ? root.Nooline : {};
  var Backbone = root.Backbone || require('backbone');
  var component = ['common/js/nooline/views/category-view/setup'];

  /**
   * @view CategoryView
   * The view for any given Category Model.  If called from the server, it
   * renders out the markup via template, providing it either back to the client
   * if appropriate.  If called from the client, it renders out changes to a
   * category's visual representation.
   *
   * @return {Object|undefined}          Module export, or nothing for clients.
   */
  var CategoryView = Backbone.View.extend({
    /**
     * @constructor CategoryView
     * Setup the view based on where it's being called.
     *
     * If loaded from the client, it should have all resources loaded prior.  If
     * loaded from the server, it'll load the machinery needed to render out the
     * content in a template.  Finally, it binds relevant events to the view.
     *
     * @return None.
     */
    constructor: function CategoryView () {

      Backbone.View.apply(this, arguments);

      if (typeof module !== 'undefined') {
        require('./category-view/setup');
      }

      this.bindEvents();
    },
    options: {}
  });

  N.Views = N.Views || {};
  N.Views.CategoryView = CategoryView;

  if (typeof module !== 'undefined') {

    module.exports = CategoryView;
    return module.exports;

  } else {

    N.componentsLoading.concat(component);
    require(
      ['common/js/nooline/views/category-view/setup'],
      function removeLoaded () {

      N.componentsLoading = _.difference(N.componentsLoading, component);

      if (!N.componentsLoading.length) {
        N.$document.trigger('components:complete');
      }
    });

  }

  // return 'views/category-view';

});
