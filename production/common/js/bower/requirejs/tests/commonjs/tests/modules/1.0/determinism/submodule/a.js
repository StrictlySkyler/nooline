define(["require", "exports", "module", "test","test","a"], function(require, exports, module) {
var test = null;
var pass = false;
var test = null;
try {
    null;
} catch (exception) {
    pass = true;
}
test.assert(pass, 'require does not fall back to relative modules when absolutes are not available.')

});
