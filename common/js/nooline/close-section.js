define('common/js/nooline/close-section',
  ['common/js/nooline/load-components'],
  function () {

  var N = window.Nooline;

  /**
   * closeSection
   * Hide a section panel.
   *
   * Usually this is used to hide an admin panel, such as the login section.
   *
   * @param e {Object}  The jQuery event triggering the request.
   * @return            None.
   */
  N.closeSection = function closeSection (e) {

    $(e.target)
      .parents('section')
      .addClass('hidden')
      /**
       * removeSection
       * Once the section is finished animating out, we yank it from the DOM.
       *
       */
      .one('transitionend webkitTransitionEnd', function removeSection () {

        $(this).remove();
    });

  };

  return N;

});
