({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/build-timeline',
  ['common/js/nooline/load-components'],
  function () {

  var N = window.Nooline;

  /**
   * buildTimeline
   * Build the timeline feature.
   *
   * Calls the `createStoryJS` function specific to the TimelineJS method.
   * Sadly, this is a global function for now, depending on how the library
   * grows/is updated or not.
   *
   * @param data  {Object}  The content snippets to become slides.
   * @return                None.
   */
  N.buildTimeline = function buildTimeline (data) {

    createStoryJS(data);
  };

});
