
;(function buildCloseSection (N) {
  
  N.closeSection = function closeSection (e) {
  
    $(e.target)
      .parents('section')
      .addClass('hidden')
      .one('transitionend webkitTransitionEnd', function removeSection () {
        
        $(this).remove();
    });
  
  };
  
}(window.Nooline));