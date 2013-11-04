define(["require", "exports", "module", "test","a","b"], function(require, exports, module) {
var test = null;
var a = null;
var b = null;

test.assert(a.a, 'a exists');
test.assert(b.b, 'b exists')
test.assert(a.a().b === b.b, 'a gets b');
test.assert(b.b().a === a.a, 'b gets a');

test.print('DONE', 'info');

});
