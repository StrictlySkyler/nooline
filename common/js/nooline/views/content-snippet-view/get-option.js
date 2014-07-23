
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/views/content-snippet-view/get-option',
  [],
  function () {

  var N = this.Nooline;

  /**
   * getOption
   * Get an option on the View.
   *
   * Simple getter for view state.
   *
   * @param option  {String}  Key for the value of the desired option.
   * @return        {Number
   *                |String
   *                |Object
   *                |Array
   *                |Boolean
   *                |undefined}  Desired option.
   */
  N.Views.ContentSnippetView.prototype.getOption = function (option) {

    return this.options[option];

  };

  // return 'views/content-snippet-view/get-option';

});
