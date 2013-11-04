define(["require", "exports", "module", "test","bogus"], function(require, exports, module) {
var test = null;
try {
    null;
    test.print('FAIL require throws error when module missing', 'fail');
} catch (exception) {
    test.print('PASS require throws error when module missing', 'pass');
}
test.print('DONE', 'info');

});
