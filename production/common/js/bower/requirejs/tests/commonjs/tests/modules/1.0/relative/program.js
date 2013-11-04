define(["require", "exports", "module", "test","submodule/a","submodule/b"], function(require, exports, module) {
var test = null;
var a = null;
var b = null;
test.assert(a.foo == b.foo, 'a and b share foo through a relative require');
test.print('DONE', 'info');

});
