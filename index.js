var through = require( 'through2' );
var gutil = require( 'gulp-util' );

module.exports = function ( option ) {
    'use strict';

    var CONST_PATTERN = '<\\!--\\s*inject-style\\s*(.*)?\\s*-->';

    if ( !option ) {
        option = {};
    }

    if ( option.match_pattern ) {
        try {
            new RegExp(option.match_pattern);
        } catch (e) {
            this.emit( 'error',
                new gutil.PluginError( 'gulp-style-inject', ' Invalid `match_pattern` parameter. Regular expression string required.' ) );
        }
    } else {
        option.match_pattern = CONST_PATTERN;
    }

    if ( typeof option.transform !== 'function' && option.transform ) {
        this.emit( 'error',
            new gutil.PluginError( 'gulp-style-inject', 'Invalid transformation in `transform` parameter.' ) );
    }

    function styleInject( file, enc, callback ) {
        /*jshint validthis:true*/

        // Do nothing if no contents
        if ( file.isNull() ) {
            this.push( file );
            return callback();
        }

        // check if file.contents is a `Stream`
        if ( file.isStream() ) {
            // accepting streams is optional
            this.emit( 'error',
                new gutil.PluginError( 'gulp-style-inject', 'Stream content is not supported' ) );
            return callback();
        }

        // check if file.contents is a `Buffer`
        if ( file.isBuffer() ) {
            var contents = String( file.contents );

            var occurence = contents.match( new RegExp( option.match, 'gim' ) );
            if ( occurence.length !== 0 ) {
                for ( var i = 0; i < occurence.length; i++ ) {
                    var cssFileMatches = new RegExp( option.match, 'm' ).exec( occurence[ i ] );
                    if ( !cssFileMatches || !cssFileMatches[ 1 ] ) {
                        this.emit( 'error',
                            new gutil.PluginError( 'gulp-style-inject', 'No parameters specified in ' + occurence[ i ] ) );
                        return callback();
                    } else {
                        console.log( cssFileMatches[ 1 ] );
                    }
                }
            }
            file.contents = new Buffer( contents );
            this.push( file );
            return callback();
        }

        return callback();
    }

    return through.obj( styleInject );
};