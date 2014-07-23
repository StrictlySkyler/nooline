
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/views/content-snippet-view/bind-events',
  [],
  function () {

  var N = this.Nooline;

  /**
   * bindEvents
   * Attach events to the DOM element and the View.
   *
   * Bind whichever events we need to the DOM element, allowing for user
   * interaction.  In the cases where the DOM element may not be set yet, we
   * add an event listener to the document for an event matching the element
   * uuid.  When the elements are finished building, the uuid event fires,
   * and we can then bind the events we need appropriately.
   *
   * We also attach events to the View itself, allowing for it to respond to
   * state changes in the model or internally.
   *
   * @param element {Object}  DOM element on which to bind.
   * @return
   */
  N.Views.ContentSnippetView.prototype.bindEvents = function (element) {

    var _this = this;

    _this.setElement(element);

    _this.$el
      .on('click',
        '.edit-content-button',
        function startEditing () {

        _this.startEditing();
      })

      .on('click',
        '.cancel-editing-button',
        function cancelEditing () {

        _this.stopEditing();
      })

      .on('click',
        '.commit-changes-button',
        function commitChanges () {

        _this.commitChanges();
      })

      .on('click',
        '.unpublish-content-button',
        function unpublishContent () {

        _this.unpublishContent();
      });

    if (!this.getOption('bound')) {

      this.setOptions('bound', true);

      this.on({
        'options:change': this.render,

        'editor:enable': function enableEditor () {

          this.setOptions('editor', true);
        },

        'editor:disable': function disableEditor () {

          this.setOptions('editor', false);
        },

        'editor:commit': this.save,

        'remove': this.remove
      });
    }

  };

  // return 'views/content-snippet-view/bind-events';

});
