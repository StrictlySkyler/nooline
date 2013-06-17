
!(function buildCloseSection (N) {
  
  N.closeSection = function closeSection (e) {
  
    $(e.target)
      .parents('section')
      .addClass('hidden')
      .one('webkitTransitionEnd', function hidePanel() {
        $(this).remove();
    });
  
  };
  
}(window.Nooline));