require(["one"],function(e){define("nested",["two"],function(e){return{name:"nested",two:e}}),require(["nested"],function(n){doh.register("nestedDefine2",[function(t){t.is("one",e.name),t.is("two",n.two.name),t.is("nested",n.name)}]),doh.run()})});