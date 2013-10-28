
;(function buildBindEvents (N) {
  
  N.Views.ContentSnippetView.prototype.bindEvents = function (element) {

    var _this = this;

    _this.setElement(element);

    // Need to be able to bind to this scope later, see note below.
    // 
    // TODO:  This should be split into another file.
    function bindElementEvents (element) {
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
        // Sometimes the view is ready before the timeline has delivered the 
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
        'options:change': function renderChanges () {
          
          this.render();
        },

        'editor:enable': function enableEditor () {
          
          this.setOptions('editor', true);
        },

        'editor:disable': function disableEditor () {
          
          this.setOptions('editor', false);
        },

        'editor:commit': function postChanges () {
          
          this.save();
        }
      });
    }

  };

}(window.Nooline));