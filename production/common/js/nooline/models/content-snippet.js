
define("common/js/nooline/models/content-snippet", [
    'node_modules/node-uuid/uuid'
  ], function(){
  ;(function buildContentSnippetModel () {
    
    var root = this;
    var N = root.Nooline;
    var Backbone = root.Backbone || null;
    var ContentSnippetView;
    var uuid = root.uuid || null;

    var ContentSnippet = Backbone.Model.extend({
      constructor: function ContentSnippet () {

        Backbone.Model.apply(this, arguments);

        if (typeof root.document !== 'undefined') {

          ContentSnippetView = N.Views.ContentSnippetView;

          this.bindEvents();

        } else {

          ContentSnippetView = null;
          // Right now jQuery for node is out of date.
          // Current node version ~= 1.8.x
          // Current client version on Bower = ~= 2.0.x
          // When these versions reach parity, they should use the same source.
          // 2013-09-13
          Backbone.$ = null;

        }

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
        headline: '',
        index: this.collection ? this.collection.first().get('index') + 1 : null,
        prettyStartDate: '',
        prettyStartTime: '',
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

    if (typeof module !== 'undefined') {

      module.exports = ContentSnippet;
    } else {

      N.Models = N.Models || {};
      N.Models.ContentSnippet = ContentSnippet;

      require(['common/js/nooline/models/content-snippet/setup']);

    }

  }).call(this);
});