define('common/js/nooline/remove-controls',
  ['common/js/nooline/load-components'],
  function () {

  var N = this.Nooline;

  /**
   * removeControls
   * Remove the controls present on each snippet.
   *
   * Triggered on logout.
   *
   * @return  None.
   */
  N.removeControls = function removeControls () {

    var allSnippets = N.contentCategories.findAllContent();

    /**
     * notifyEachSnippet
     * Triggers the 'logout' event on each snippet.
     *
     * @param snippet {Object}  A given content snippet model.
     * @return                  None.
     */
    allSnippets.each(function notifyEachSnippet (snippet) {
      snippet.trigger('logout');
    });

  };

});
