
/**
 * @route content
 * Loads content based on request type.
 *
 * Can load either a specific category of content, or all categories, based
 * on whether a type is specified or not.
 *
 * TODO: Probably worth extending this to accept a query for multiple
 * categories.
 *
 * @param {Object}  req   Express client request object.
 * @param {Object}  res   Express response object to send back.
 * @param {Object}  info  Metadata relevant to the nature of the request.
 */
module.exports = function content (req, res, info) {

  var ContentCategories = 
    require('../common/js/nooline/collections/content-categories');
  var _contentCategories = new ContentCategories();
  
  if (typeof info !== 'object') {
    info = {
      specific: true
    };
  }

  info.req = req ? req : info.req;
  info.res = res ? res : info.res;
  info.metaLoaded = 0;
  info.categories = info.req.query.type ? 
    info.req.query.type.split(',') : 
    info.categories
    ;
  info.contentPath = './sites/' + info.req.host + '/content';
  info.meta = {};
  info.nooline = req.app;
  info.domain = req.host;

  if (req && req.query.type) {
    info.query = true;
  }

  _contentCategories.loadModels(info);

};
