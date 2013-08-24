suite( "Lodashed", function() {
    "use strict";

    var expect = require( "chai" ).expect;
    var _ = require( "../lodashed" );

    suite( ".type()", function() {
        /* jshint evil:true */

        test( "null/undefined", function() {
            expect( _.type( null ) ).to.equal( "null" );
            expect( _.type( undefined ) ).to.equal( "undefined" );
        });

        test( "String", function() {
            expect( _.type( "my string" ) ).to.equal( "string" );
            expect( _.type( String( "my string" ) ) ).to.equal( "string" );
        });

        test( "Number", function() {
            expect( _.type( 0 ) ).to.equal( "number" );
            expect( _.type( new Number( 0 ) ) ).to.equal( "number" );
        });

        test( "Boolean", function() {
            expect( _.type( true ) ).to.equal( "boolean" );
            expect( _.type( new Boolean( true ) ) ).to.equal( "boolean" );
        });

        test( "Function", function() {
            expect( _.type(function() {}) ).to.equal( "function" );
            expect( _.type( new Function( "" ) ) ).to.equal( "function" );
        });

        test( "Array", function() {
            expect( _.type( [] ) ).to.equal( "array" );
            expect( _.type( new Array() ) ).to.equal( "array" );
        });

        test( "Date", function() {
            expect( _.type( new Date() ) ).to.equal( "date" );
        });

        test( "RegExp", function() {
            expect( _.type( /\w+/ ) ).to.equal( "regexp" );
            expect( _.type( new RegExp( "/\\w+/" ) ) ).to.equal( "regexp" );
        });

        test( "Object", function() {
            expect( _.type( {} ) ).to.equal( "object" );
            expect( _.type( new Object() ) ).to.equal( "object" );
        });
    });

    test( ".uncapitalize()", function() {
        expect( _.uncapitalize( "NODE.JS" ) ).to.equal( "nODE.JS" );
    });

    suite( ".extendDeep()", function() {
        test( "return 1st arg if not object", function() {
            expect( _.extendDeep( true ) ).to.equal( true );
            expect( _.extendDeep( "" ) ).to.equal( "" );
            expect( _.extendDeep( 1 ) ).to.equal( 1 );
        });

        test( "recursively extend object", function() {
            var obj1 = {
                a: {
                    b: true,
                    c: 123,
                    d: {
                        e: 456
                    }
                },
                f: "string",
                g: /\w+/
            };

            var obj2 = {
                a: {
                    c: null,
                    d: {
                        e: 789
                    }
                },
                h: "string"
            };

            var obj3 = {
                f: false
            };

            expect( _.extendDeep( obj1, obj2, obj3 ) ).to.deep.equal({
                a: {
                    b: true,
                    c: null,
                    d: {
                        e: 789
                    }
                },
                f: false,
                g: /\w+/,
                h: "string"
            });
        });
    });

    suite( ".replaceAll()", function() {
        test( "return 1st arg if token not string", function() {
            expect( _.replaceAll( "test", true ) ).to.equal( "test" );
        });

        test( "case sensitive replace", function() {
            expect( _.replaceAll( "AaA", "a", "b" ) ).to.equal( "AbA" );
        });

        test( "case insensitive replace", function() {
            expect( _.replaceAll( "AaA", "a", "b", true ) ).to.equal( "bbb" );
        });
    });

    test( ".uuid()", function() {
        expect( _.uuid() ).to.match( /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/ );
    });

    test( ".defaultsDeep()", function() {
        var obj1 = {
            a: {
                b: false
            },
            c: 123
        };
        var obj2 = {
            a: {
                c: new Date()
            },
            c: 456,
            d: "yay"
        };

        expect( _.defaultsDeep( obj1, obj2 ) ).to.deep.equal({
            a: {
                b: false,
                c: obj2.a.c
            },
            c: 123,
            d: "yay"
        });
    });

    suite( ".byteFormat()", function() {
        test( "returns false for non-numeric value", function() {
            var formatted = _.byteFormat( "yay" );
            expect( formatted ).to.be.not.ok;
        });

        test( "returns properly formatted byte size", function() {
            var formatted = _.byteFormat( 1048576 );
            expect( formatted ).to.equal( "1 MB" );
        });

        test( "correctly formats according to params", function() {
            var args;
            var old = _.numberFormat;
            _.numberFormat = function() {
                args = arguments;
            };

            _.byteFormat( 1048576, 2, ".", " " );

            expect( args[ 0 ] ).to.be.a( "number" );
            expect( args[ 1 ] ).to.equal( 2 );
            expect( args[ 2 ] ).to.equal( "." );
            expect( args[ 3 ] ).to.equal( " " );

            _.numberFormat = old;
        });
    });
});