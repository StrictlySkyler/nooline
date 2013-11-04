define(["require", "exports", "module", "test","submodule/a","b"], function(require, exports, module) {
var test = null;
var a = null;
var b = null;
test.assert(a.foo().foo === b.foo, 'require works with absolute identifiers');
test.print('DONE', 'info');

});
