// Boilerplate for loading via CJS and AMD both.
({ define: typeof define === "function"
  ? define
  : function(name, deps, func) { 
    exports = module.exports = func(); 
  } 
}).define(
  'common/js/nooline/collections/content-categories/render-categories', 
  [], 
  function () {

  var N = this.Nooline;

  N.Collections.ContentCategories.prototype.renderCategories = function () {
    // TODO: This should probably be made into a view rendering from another 
    // model at some point.  An EndPoint model, perhaps?  Something like it?

    var content;

    if (this.info.specific) {

      content = this.models[0].toJSON();
      content.snippets = content.snippets.toJSON();
      delete content.info;

    } else {

      content = {};

      this.info.categories.forEach((function (category) {

        content[category] = this.findWhere({ type: category });
      }).bind(this));
    }

    // TODO: Timeline specifics.  Need to abstract this away.
    if (content.source) {
      content.source.timeline.date = content.snippets;
    }

    if (this.info.query) {

      this.info.res.send(JSON.stringify(content));

    } else {

      this.info.next(content, this.info);
    }

  };
});