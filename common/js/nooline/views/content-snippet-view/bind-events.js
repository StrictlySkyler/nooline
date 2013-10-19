
;(function buildBindEvents (N) {
  
  N.Views.ContentSnippetView.prototype.bindEvents = function () {

    var _this = this;

    // TODO: Might make this into a method on ContentSnippetView.
    function bindElementEvents() {

      _this.$el
        .on('click', '.edit-content-button', {
          this: _this
        }, _this.startEditing)

        .on('click', '.cancel-editing-button', {
          this: _this
        }, _this.stopEditing)

        .on('click', '.commit-changes-button', {
          this: _this
        }, _this.commitChanges);
        
    }

    if (!this.$el.attr('id')) {
      
      // Sometimes the view is ready before the timeline has delivered the 
      // appropriate div content, since it's built by AJAX.
      // 
      // Might be nice to wrap the element with the default div Backbone 
      // supplies, so this step isn't necessary.  That's likely to alter the 
      // behavior of TimelineJS, if not done carefully.
      $(document).on(this.model.get('uuid'), function (e, $el) {
        $(document).off(e.type);

        _this.setElement($el);

        if (_this.$edit && _this.getOption('editable')) {
          _this.$edit.appendTo(_this.$el);
        }

        // Event listeners haven't been assigned in this case, as the element
        // hasn't been available.
        bindElementEvents();
      });
      
    }

    bindElementEvents();
    
    this.on({
      'options:change': function renderChanges () {
        
        this.render();
      },

      'editor:enable': function enableEditor () {
        
        this.setOptions('editor', true);
      },

      'editor:disable': function disableEditor (e) {
        
        this.setOptions('editor', false);
      },

      'editor:commit': function postChanges () {
        
        this.sync();
      }
    });

  };

}(window.Nooline));