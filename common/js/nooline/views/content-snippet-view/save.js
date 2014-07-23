
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/views/content-snippet-view/save',
  [],
  function () {

  var N = this.Nooline;

  /**
   * save
   * Save updated content.
   *
   * Timestamps and updates the user edited content back to the model, which
   * then sends it back to the server.
   *
   * @return  None.
   */
  N.Views.ContentSnippetView.prototype.save = function () {

    var user = JSON.parse(sessionStorage.getItem('lastLoginAttempt')).username;
    var now = window.moment();
    var prettyDate = now.format('dddd, MMMM Mo, YYYY');
    var prettyTime = now.format('hh:mm:ss a');
    var date = now.format('YYYY,M,D');
    var time = now.format('HH:m:s');

    this.setOptions('saved', true);

    this.model.save({
      headline: this.$editableElement.children('.headline').text(),
      text: this.$editableElement.children('.text').html(),
      author: user,
      prettyStartDate: prettyDate,
      prettyStartTime: prettyTime,
      startDate: date,
      startTime: time
    });
  };

  // return 'views/content-snippet-view/save';

});
