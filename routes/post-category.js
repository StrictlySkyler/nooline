
module.exports = function postCategory (req, res) {

  var saveContent = require('../controllers/save-content');

  var category = require('./get-category');

  req.info = {
    next: saveContent
  };

  category(req, res);

};