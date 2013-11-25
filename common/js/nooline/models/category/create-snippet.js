
define(function () {

  var N = window.Nooline;
  
  N.Models.Category.prototype.createSnippet = function () {
    
    var snippets = this.get('snippets');
    var index = snippets.first().get('index') + 1;
    var user = JSON.parse(sessionStorage.getItem('lastLoginAttempt')).username;
    var now = window.moment();
    var prettyDate = now.format('dddd, MMMM Mo, YYYY');
    var prettyTime = now.format('hh:mm:ss a');
    var date = now.format('YYYY,M,D');
    var time = now.format('HH:m:s');

    var attributes = {
      index: index,
      type: this.get('type'),
      url: this.get('url') + '/' + index,
      author: user,
      prettyStartDate: prettyDate,
      prettyStartTime: prettyTime,
      startDate: date,
      startTime: time,
      headline: 'Headline',
      text: 'Main content'
    };

    var newSnippet = snippets.add(attributes);

    var source = this.get('source');

    if (source) {
      source.timeline.date.push(newSnippet.attributes);
    }

    newSnippet.trigger('create');
    
  };

  return 'models/category/create-snippet';

});