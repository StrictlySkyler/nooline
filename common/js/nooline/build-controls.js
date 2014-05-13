
define(function () {
  var N = window.Nooline;
    
  /**
   * buildControls
   * Build out controls for a logged in user.
   *
   * After the user logs in, determine which controls that user is allowed to
   * have, based on permissions, and add them.
   *
   * @param data  {Object}  Data about the user.
   * @return                None.
   */
  N.buildControls = function buildControls (data) {

    var allSnippets = N.contentCategories.findAllContent();

    require([
      // TODO: Wrap this into an extension to allow for swapping out WYSIWYGs.
      'common/js/bower/eo-ckeditor/ckeditor'
    /**
     * notifyAllSnippets
     * Notify content snippets to build their appropriate controls.
     *
     * @return  None.
     */
    ], function notifyAllSnippets () {

      /**
       * notifyEachSnippet
       * Tells the snippets to respond to the 'login' event.
       *
       * @param snippet {Object}  The content snippet data model.
       * @return                  None.
       */
      allSnippets.each(function notifyEachSnippet (snippet) {
        snippet.trigger('login');
      });
    });
  
    /**
     * addPermission
     * Adds the user's permissions to the client.
     *
     * These are based on what each user is allowed to do in their config.
     *
     * @param permission  {String}  The type of permission the user can have.
     * @return                      None.
     */
    _.each(data.permissions, function addPermission (permission) {

      _.each(N.controls['control-locations'], 
        /**
         * addControl
         * Adds controls to the DOM.
         *
         * Based on what they have the ability to modify, add the controls
         * appropriately.  Add a DOM container if needed.
         *
         * @param types {Object}  The types of things the user can do.
         * @param spot  {String}  Where to render the control.
         * @return                None.
         */
        function addControl (types, spot) {

        var $button;
        var $container;

        if (types[permission]) {
          $container = $('#'+ spot + '-controls');
          $button = $('<button></button>')
            .attr({
              id: spot + '-' + permission,
              class: 'control button ' + permission,
              title: N.controls['control-data'][permission].title
            })
            .html(N.controls['control-data'][permission].text);

        }

        if ($button
          && !$container.length) {

          $container = $('<div></div>')
            .attr({
              id: spot + '-controls',
              class: 'hidden controls panel logged-in-panel'
            })
            .prependTo('#' + spot);

          /**
           * showContainer
           * Remove the hidden class once the container is built, to allow
           * for animation.
           *
           * @return  None.
           */
          requestAnimationFrame(function showContainer () {
            $container.removeClass('hidden');
          });
        }
        
        if ($button) {
          $button.prependTo($container);

        }
        
      });
      
    });
    
  };
  
});
