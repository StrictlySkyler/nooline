
define(function () {

  var N = window.Nooline;
  
  N.Views.ContentSnippetView.prototype.remove = function () {

    var category = this.model.get('type');
    var narrative;
    var index;
    var dates;
    var source;

    this.$el.remove();

    if (category === 'timeline') {
      $('#narrative').remove();

      index = this.model.get('index');

      narrative = N.contentCategories.get('narrative');
      source = narrative.get('source');
      dates = source.timeline.date;

      source.timeline.date = _.reject(dates, function reject (date) {
        return date.index === index;
      });

      N.contentCategories.get('narrative').set('source', source);

      window.VMM.master_config.Timeline.current_slide = 
        window.VMM.Timeline.Config.current_slide = 
        narrative.get('snippets').length;

      N.buildTimeline(N.contentCategories.get('narrative').attributes);

      narrative.get('snippets').each(function rebindEvents (snippet) {
        snippet.view.bindEvents();
      });
    }

    delete this.model;

  };

  return 'views/content-snippet-view/remove';

});