
define('common/js/nooline/views/content-snippet-view', [
  'node_modules/backbone/backbone'
  ], function (){

    var root = this;
    var N = root.window ? root.Nooline : null;
    var Backbone = root.Backbone || require('backbone');
    var component = ['common/js/nooline/views/content-snippet-view/setup'];

    /**
     * @view ContentSnippetView
     * Rendered view for a content snippet.
     *
     * Renders the data contained in a ContentSnippet, and manages all
     * interactions with that data.
     *
     * TODO: Add the server-side assembly to this, for both RSS and template
     * rendering.
     *
     * @return  {Object|undefined}  Module exports if we're on the server.
     */
    var ContentSnippetView = Backbone.View.extend({
      /**
       * ContentSnippetView
       * Set up all the view things.
       *
       * Bind some initial events to the element by its uuid.  In some cases,
       * the view may not be finished setting up, so we don't necessarily
       * have it set as the `$el` or `el` on this view yet.
       *
       * @return  None.
       */
      constructor: function ContentSnippetView () {

        var element;

        Backbone.View.apply(this, arguments);

        if (typeof module === 'undefined') {

          this.options = {};

          element = document.getElementById(this.model.get('uuid'));

          this.bindEvents(element);
        }
      }
    });

    if (typeof module !== 'undefined') {

      module.exports = ContentSnippetView;
      return module.exports;

    } else {

      N.Views = N.Views || {};
      N.Views.ContentSnippetView = ContentSnippetView;

      N.componentsLoading.concat(component);
      require(
        ['common/js/nooline/views/content-snippet-view/setup'],
        function removeLoaded () {

        N.componentsLoading = _.difference(N.componentsLoading, component);

        if (!N.componentsLoading.length) {
          N.$document.trigger('components:complete');
        }

      });

    }

  // return 'views/content-snippet-view';
});
