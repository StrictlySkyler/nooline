// Boilerplate for AMD and CJS isomorphism.
define('common/js/nooline/models/category', [
    'node_modules/backbone/backbone'
  ], function () {

  var root = this;
  var N = root.Nooline = root.Nooline || {};
  var Backbone = root.Backbone || require('backbone');
  var CategoryView;
  var component = ['common/js/nooline/models/category/setup'];

  /**
   * @model Category
   * Data model for a type of content.
   *
   * This is essentially a "Type" of content, such as "post" or "feed" or
   * whathaveyou.  Each Category contains a Snippets Collection, which is
   * comprised of individual Snippet Models.  Category Models are contained
   * by the ContentCategory Collection.
   *
   * @return  {Object|undefined}  Module export, or nothing for clients.
   */
  var Category = Backbone.Model.extend({
    /**
     * @constructor Category
     * Setup the Category based on context.
     *
     * If we're on the server, we stub out jQuery, and attach a view for
     * assembly.  If we're on the client, we grab the pre-rendered element
     * for this category's view, and assign a reference on our model to the
     * view, binding the markup to the View at the same time.
     *
     * @return  None.
     */
    constructor: function Category () {

      var id;

      Backbone.Model.apply(this, arguments);

      // TODO: Probably worth extracting into a helper.
      if (typeof root.document !== 'undefined') {

        id = document.getElementById(this.get('type'));
        CategoryView = N.Views.CategoryView;

      } else {

        CategoryView = require('../views/category-view');

        Backbone.$ = require('jquery');

        require('./category/setup');
      }

      this.bindEvents();

      this.view = new CategoryView({
        model: this,
        el: id
      });
    }
  });

  N.Models = N.Models || {};
  N.Models.Category = Category;

  if (typeof module !== 'undefined') {

    module.exports = Category;
    return module.exports;

  } else {

    N.componentsLoading.concat(component);
    require(
      ['common/js/nooline/models/category/setup'],
      function removeLoaded () {

      N.componentsLoading = _.difference(N.componentsLoading, component);

      if (!N.componentsLoading.length) {
        N.$document.trigger('components:complete');
      }
    });

  }

  // return 'models/category';

});
