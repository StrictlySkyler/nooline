define(function (require, exports, module) {
    //This is a fakeout require("fake1");

    var red = require("red"),
        blue = null,
        message = null;

    /*
     And another fakeoute require("fake2");
    */

    //Use ugly exports
    exports.name = red.name + blue.name;
    exports.path = require.toUrl('./foo.html');
    exports.message = message;
});
