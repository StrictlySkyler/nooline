
;(function buildSetOptions (N) {
  
  N.Views.ContentSnippetView.prototype.setOptions = function () {
    var key;
    var value;

    switch (arguments.length) {
      case 1:

        value = arguments[0];

        _.each(value, function (key, newValue) {

          this.options[key] = newValue;
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

}(window.Nooline));