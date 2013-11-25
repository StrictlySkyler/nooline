
define(function () {
  
  var N = window.Nooline;
    
  N.closeSection = function closeSection (e) {
  
    $(e.target)
      .parents('section')
      .addClass('hidden')
      .one('transitionend webkitTransitionEnd', function removeSection () {
        
        $(this).remove();
    });
  
  };
    
});