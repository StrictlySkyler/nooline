
define(function () {

  var N = window.Nooline;

  /**
   * createSnippet
   * Create a new piece of content.
   *
   * Creates a Snippet Model, and adds it to the Snippets Collection
   * referenced by this Category Model.  Populates the snippet with some
   * initial data, and then tells it to set itself up.
   *
   * @return
   */
  N.Models.Category.prototype.createSnippet = function () {

    var snippets = this.get('snippets');
    var index = 1 + N.contentCategories.reduce(function (memo, category) {
      return memo + category.get('snippets').length;
    }, 0);
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

    // Probably can push this determining where it should load down to the
    // snippet itself.
    var source = this.get('source');

    if (source) {
      source.timeline.date.push(newSnippet.attributes);
    }

    newSnippet.trigger('create');

  };

  return 'models/category/create-snippet';

});
