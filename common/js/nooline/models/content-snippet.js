// Boilerplate to load this file in both CJS and AMD environs.
define('common/js/nooline/models/content-snippet', [
    'node_modules/node-uuid/uuid',
    'node_modules/backbone/backbone'
  ], function (uuid) {

    var root = this;
    var N = root.Nooline = root.Nooline || {};
    var Backbone = root.Backbone || require('backbone');
    var ContentSnippetView;
    var component  = ['common/js/nooline/models/content-snippet/setup'];

    root.uuid = root.uuid || uuid || require('node-uuid');

    /**
     * @model ContentSnippet
     * Any given piece of content.
     *
     * The data model for any discreet content chunk on the page, such as
     * an individual post, comment, card, etc.  Here we also establish some
     * defaults to add to each model, to be modified on instantiation.
     *
     * @return  {Object|undefined}  Returns module exports for the server.
     */
    var ContentSnippet = Backbone.Model.extend({
      /**
       * @constructor ContentSnippet
       * Setup all the things a ContentSnippet needs!
       *
       * Depending on where the file is loaded, either we create a view and
       * bind a reference to it, or create a reference to jQuery first.
       *
       * @return  None.
       */
      constructor: function ContentSnippet () {

        Backbone.Model.apply(this, arguments);

        if (typeof root.document !== 'undefined') {

          ContentSnippetView = N.Views.ContentSnippetView;

        } else {

          ContentSnippetView = require('../views/content-snippet-view');
          Backbone.$ = require('jquery');

          require('./content-snippet/setup');

        }

        this.view = new ContentSnippetView({
          model: this
        });

        this.bindEvents();

        this.set('id', this.get('index'));

      },

      defaults: {
        asset: {
          caption: '',
          credit: '',
          media: '',
          thumbnail: ''
        },
        author: '',
        endDate: '',
        endTime: '',
        headline: '',
        index: this.collection ?
          this.collection.first().get('index') + 1
          : null,
        prettyStartDate: '',
        prettyStartTime: '',
        published: true,
        startDate: '',
        startTime: '',
        tag: '',
        text: '',
        type: '',
        url: this.collection ?
          this.collection.url + '/' + this.collection.first().get('index') + 1
          : '',
        uuid: uuid ? uuid() : ''
      }
    });

    N.Models = N.Models || {};
    N.Models.ContentSnippet = ContentSnippet;

    if (typeof module !== 'undefined') {

      module.exports = ContentSnippet;
      return module.exports;

    } else {

      N.componentsLoading.concat(component)
      require(
        ['common/js/nooline/models/content-snippet/setup'],
        function removeLoaded () {

        N.componentsLoading = _.difference(N.componentsLoading, component);

        if (!N.componentsLoading.length) {
          N.$document.trigger('components:complete');
        }
      });

    }

    // return 'models/content-snippet';

});
