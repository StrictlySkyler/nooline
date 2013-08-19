
;(function buildBuildControls (N) {
  
  N.buildControls = function buildControls (data) {
  
    _.each(data.permissions, function addPermission (permission) {

      _.each(N.controls['control-locations'], function addControl (types, spot) {

        var $button;
        var $container;

        if (types[permission]) {
          $container = $('#'+ spot + '-controls');
          $button = $('<button></button>')
            .attr({
              id: spot + '-' + permission,
              class: 'hidden control button ' + permission,
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

          requestAnimationFrame(function showContainer () {
            $container.removeClass('hidden');
          });
        }
        
        if ($button) {
          $button.prependTo($container);

          requestAnimationFrame(function showButton () {
            $button.removeClass('hidden');
          });
        }
        
      });
      
    });
    
  };
  
}(window.Nooline));