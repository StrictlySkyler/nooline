require({baseUrl:"./",shim:{a:{exports:"A.name",init:function(){window.globalA=this.A.name}},b:["a","d"],c:{deps:["a","b"],exports:"C"},e:{exports:"e.nested.e",init:function(){return{name:e.nested.e.name+"Modified"}}},f:{deps:["a"],init:function(e){return{name:FCAP.name,globalA:FCAP.globalA,a:e}}}}},["a","c","e","f"],function(e,a,i,n){doh.register("shimBasic",[function(s){s.is("a",e),s.is("a",window.globalA),s.is("a",a.b.aValue),s.is("b",a.b.name),s.is("c",a.name),s.is("d",a.b.dValue.name),s.is("eModified",i.name),s.is("FCAP",n.name),s.is("a",n.globalA.name),s.is("a",n.a)}]),doh.run()});