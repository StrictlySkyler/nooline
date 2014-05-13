
define(function () {

  var N = window.Nooline;
  
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

    // Need to be able to bind to this scope later, see note below.
    // 
    // TODO:  This should be split into another file.
    function bindElementEvents (element) {
      // Each content snippet has a uuid as its `id` attribute; placeholder
      // View elements do not.
      if ($(element).attr('id')) {

        _this.$el
          .on('click', '.edit-content-button', function startEditing () {
            _this.startEditing();
          })

          .on('click', '.cancel-editing-button', function cancelEditing () {
            _this.stopEditing();
          })

          .on('click', '.commit-changes-button', function commitChanges () {
            _this.commitChanges();
          });

      } else if (!_this.$el.attr('id')) {
        // Sometimes the view is ready before the Timeline has delivered the 
        // appropriate div content, since it's built by AJAX.
        // 
        // Might be nice to wrap the element with the default div Backbone 
        // supplies, so this step isn't necessary.  That's likely to alter the 
        // behavior of TimelineJS, if not done carefully.
        $(document).on(_this.model.get('uuid'), function (e, $el) {
          var target = $('#' + $el.attr('id'));
          $(document).off(e.type);

          // Allows for grabbing the proper element when the timeline is 
          // recreated, since it currently is done en mass.
          _this.setElement(target);

          if (_this.getOption('editable')) {
            _this.$el.append(_this.$edit, _this.$commit, _this.$cancel);
            _this.$edit.removeClass('hidden');
          }

          // Event listeners haven't been assigned properly
          //  in this case, as the element hasn't been available.
          bindElementEvents(target);

        });
        
      }
    }

    bindElementEvents(element);

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

  return 'views/content-snippet-view/bind-events';

});
