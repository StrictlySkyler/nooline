
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) {
    exports = module.exports = func();
  }
}).define('common/js/nooline/views/content-snippet-view/save',
  ['moment'],
  function (moment) {

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
    var now = moment();
    var prettyDate = now.format('dddd, MMMM Mo, YYYY');
    var prettyTime = now.format('hh:mm:ss a');
    var date = now.format('YYYY,M,D');
    var time = now.format('HH:m:s');

    this.model.set({
      headline: this.$editableElement.children('.headline').text(),
      text: this.$editableElement.children('.text').html(),
      author: user,
      prettyStartDate: prettyDate,
      prettyStartTime: prettyTime,
      startDate: date,
      startTime: time
    });

    // TODO: We can do better than just always a post.
    this.model.sync('create', this.model);

    this.setOptions({
      saved: true
    });
  };

  // return 'views/content-snippet-view/save';

});
