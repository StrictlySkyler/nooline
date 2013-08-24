(function() {
    "use strict";

    var _   = require( "lodash" );
    var _s  = require( "underscore.string" );
    var _my = {};

    var class2type = {};
    [
        "Boolean", "Number", "String", "Function",
        "Array", "Date", "RegExp", "Object"
    ].forEach(function( name ) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    });

    /**
     * Return the type of a variable as a string
     *
     * @since   0.0.1
     * @param   {*} variable
     * @returns {String}
     */
    _my.type = function( variable ) {
        return variable == null ?
            String( variable ) :
            ( class2type[ Object.prototype.toString.call( variable ) ] || "object" );
    };

    /**
     * Converts first letter of the string to lowercase
     *
     * @since   0.0.1
     * @param   {String} str
     * @returns {string}
     */
    _my.uncapitalize = function( str ) {
        str = str == null ? "" : String( str );
        return str.charAt( 0 ).toLowerCase() + str.slice( 1 );
    };

    /**
     * Deeply extend a object.
     *
     * @since   0.0.1
     * @param   {Object} object
     * @return  {Object}
     */
    _my.extendDeep = _my.assignDeep = function( object ) {
        if ( !_.isObject( object ) ) {
            return object;
        }

        var args = _.toArray( arguments ).slice( 1 ), i = 0;
        function helper( target, src ) {
            if ( !_.isObject( src ) ) {
                return;
            }

            _.forEach( src, function( val, key ) {
                if ( _.isObject( val ) && _.isObject( target[ key ] ) ) {
                    helper( target[ key ], val );
                } else {
                    target[ key ] = val;
                }
            });
        }

        for ( ; i < args.length; i++ ) {
            helper( object, args[ i ] );
        }

        return object;
    };

    /**
     * @since   0.0.1
     * @param   {String} str
     * @param   {String} token
     * @param   {String} newToken
     * @param   {Boolean} [ignoreCase=false]
     * @return  {String}
     */
    _my.replaceAll = function( str, token, newToken, ignoreCase ) {
        var _token;
        var i = -1;

        str = str.toString();

        if ( typeof token === "string" ) {
            if ( ignoreCase ) {
                _token = token.toLowerCase();
                while ( ( i = str.toLowerCase().indexOf( _token, i >= 0 ? i + newToken.length : 0 ) ) !== -1 ) {
                    str = str.substring( 0, i ) + newToken + str.substring( i + token.length );
                }
            } else {
                return str.split( token ).join( newToken );
            }
        }

        return str;
    };

    /**
     * Returns a UUID v4.
     *
     * @see     https://gist.github.com/982883
     * @param   {*} [ph]
     * @return {String}
     */
    _my.uuid = function( ph ) {
        return ph ? // if the placeholder was passed, return a random number from 0 to 15
            ( ph ^ Math.random() * 16 >> ph / 4 ).toString( 16 ) : (
            [1e7] + // 10000000 +
                -1e3 + // -1000 +
                -4e3 + // -4000 +
                -8e3 + // -80000000 +
                -1e11 // -100000000000,
            ).replace( // replacing
                /[018]/g, // zeroes, ones, and eights with
                _my.uuid // random hex digits
            );
    };

    var byteSizes = [
        "Bytes",
        "KB",
        "MB",
        "GB",
        "TB",
        "PB",
        "EB",
        "ZB",
        "YB"
    ];

    /**
     * @see     http://codeaid.net/javascript/convert-size-in-bytes-to-human-readable-format-%28javascript%29
     * @since   0.0.1
     * @param   {Number} bytes
     * @param   {Number} [decimals]
     * @param   {Number} [decimalSeparator]
     * @param   {Number} [orderSeparator]
     * @returns {String}
     */
    _my.byteFormat = function( bytes, decimals, decimalSeparator, orderSeparator ) {
        bytes = Math.abs( bytes );
        if ( isNaN( bytes ) ) {
            return false;
        } else if ( bytes === 0 ) {
            return 0 + " " + byteSizes[ 0 ];
        }

        var i = parseInt( Math.floor( Math.log( bytes ) / Math.log( 1024 ) ), 10 );
        return _.numberFormat(
            bytes / Math.pow( 1024, i ),
            decimals,
            decimalSeparator,
            orderSeparator
        ) + " " + byteSizes[ i ];
    };

    /**
     * Deeply defaults properties in a object.
     *
     * @since   0.0.1
     * @returns {Object}
     */
    _my.defaultsDeep = _.partialRight( _.merge, _.defaults );

    // Mix in Lo-Dash, Underscore.String and our own underscore extensions!
    _.str = _s;
    _.mixin( _s.exports() );
    _.mixin( _my );

    module.exports = _;
})();