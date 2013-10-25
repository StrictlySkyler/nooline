
;(function buildSync (N) {
  
  N.Views.ContentSnippetView.prototype.save = function () {
    
    var user = JSON.parse(sessionStorage.getItem('lastLoginAttempt')).username;
    var now = window.moment();
    var prettyDate = now.format('dddd, MMMM Mo, YYYY');
    var prettyTime = now.format('hh:mm:ss a');
    var date = now.format('YYYY,M,D');
    var time = now.format('HH:m:s');

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

}(window.Nooline));