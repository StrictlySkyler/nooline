// Boilerplate to load this file in both CJS and AMD environs.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/models/content-snippet', [
    'node_modules/node-uuid/uuid'
  ], function () {

    var root = this;
    var N = root.Nooline = root.Nooline || {};
    var Backbone = root.Backbone || require('backbone');
    var ContentSnippetView;
    var uuid = root.uuid || require('node-uuid');

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

          require('./content-snippet/setup')();

        }

        this.bindEvents();

        this.view = new ContentSnippetView({
          model: this
        });

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

      require(['common/js/nooline/models/content-snippet/setup']);

    }

    // return 'models/content-snippet';

});
