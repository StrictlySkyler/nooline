var mocha = new ( require( "mocha" ) )();

mocha.addFile( "test/index.js" );
mocha.ui( "tdd" );

mocha.run();