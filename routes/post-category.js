
/**
 * @route postCategory
 * Handles posting content to a specific category.
 *
 * After the category is loaded, it the next op it will call saves the data
 * to a new file.
 *
 * @param req {Object}  Express POST request object from the client.
 * @param res {Object}  Express object to send back as a response.
 * @return              None.
 */
module.exports = function postCategory (req, res) {

  var saveContent = require('../controllers/save-content');
  // TODO: Update this for isomorphism
  var category = require('./get-category');

  req.info = {
    next: saveContent
  };

  category(req, res);

};
