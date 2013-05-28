
exports.timeline = function timeline (req, res) {
  var fs = require('fs');
  var path = '.' + req.path;
  var dates = path + 'dates/';
  var setup;
  var totalFiles;
  var currentIndex;
  
  // TODO: Maybe consider using 'stewardess' module for this?
  function buildTimeline(error, data) {
    if (error) {
      console.error(error);
    } else {
      try {
        setup = JSON.parse(data);
      } catch (error) {
        console.error(error);
      }
      
      fs.readdir(dates, getDateIndex);
    }
  }
  
  function getDateIndex(error, files) {
    var i = 0;
    totalFiles= files.length;
    currentIndex = 0;
    
    for (i, files; i < files.length; i++) {
      fs.readFile(dates + files[i], 'utf8', parseDates);
    }
  }
  
  function parseDates(error, data) {
    if (error) {
      console.error(error);
    } else {
      try {
        data = JSON.parse(data);
      } catch (error) {
        console.error(error);
      }
      setup.source.timeline.date.push(data);
      currentIndex++;
      
      if (currentIndex === totalFiles) {
        res.send(JSON.stringify(setup));
      }
    }
    
  }

  fs.readFile(path + 'setup.json', 'utf8', buildTimeline);
};