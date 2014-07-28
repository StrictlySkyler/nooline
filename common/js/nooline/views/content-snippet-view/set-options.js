
define('common/js/nooline/views/content-snippet-view/set-options',
  [],
  function () {

  var N = this.Nooline;

  /**
   * setOptions
   * Set view options.
   *
   * Setter for view state.  Accepts one or two arguments: either an object
   * containing a hash of the new properties to set, or the key to set as a
   * first argument with the new value as the second.
   *
   * @return  {Object|Number|String|Array|RegExp} The value set.
   */
  N.Views.ContentSnippetView.prototype.setOptions = function () {
    var key;
    var value;
    var _this = this;

    switch (arguments.length) {
      case 1:

        value = arguments[0];

        _.each(value, function (newValue, key) {

          _this.options[key] = newValue;
        });
        break;

      case 2:

        key = arguments[0];
        value = arguments[1];

        this.options[key] = value;

        break;

    }

    this.trigger('options:change');

    return value;
  };

  // return 'views/content-snippet-view/set-options';

});
