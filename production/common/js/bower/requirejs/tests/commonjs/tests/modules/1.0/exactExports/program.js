define(["require", "exports", "module", "test","a"], function(require, exports, module) {
var test = null;
var a = null;
test.assert(a.program() === exports, 'exact exports');
test.print('DONE', 'info');

});
