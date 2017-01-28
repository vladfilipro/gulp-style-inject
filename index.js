var through = require( 'through2' );
var gutil = require( 'gulp-util' );
var fs = require( 'fs' );

module.exports = function ( option ) {
    'use strict';

    var CONST_PATTERN = '<\\!--\\s*inject-style\\s*(.*?)\\s*-->';

    var self = null;

    if ( !option ) {
        option = {};
    }

    if ( option.match_pattern ) {
        try {
            new RegExp( option.match_pattern );
        } catch ( e ) {
            this.emit( 'error',
                new gutil.PluginError( 'gulp-style-inject', ' Invalid `match_pattern` parameter. Regular expression string required.' ) );
        }
    } else {
        option.match_pattern = CONST_PATTERN;
    }

    if (!option.path) {
        option.path = '';
    }

    if (option.encapsulated === undefined) {
        option.encapsulated = true
    } else {
        option.encapsulated = !!option.encapsulated
    }

    function throwError( msg ) {
        self.emit( 'error',
            new gutil.PluginError( 'gulp-style-inject', msg ) );
    }

    function transformResponse( contents ) {
        return (option.encapsulated) ? '<style>\n' + contents + '\n</style>' : contents;
    }

    function getAttributes( params ) {
        var result = {};
        var group = params.replace( /\s+/gi, ' ' )
            .split( ' ' );
        for ( var i = 0; i < group.length; i++ ) {
            if ( group[ i ] ) {
                var combination = group[ i ].split( '=' );
                result[ combination[ 0 ].replace( /\s*['"](.*)['"]\s*/, '$1' ) ] = combination[ 1 ].replace( /\s*['"](.*)['"]\s*/, '$1' );
            }
        }
        return result;
    }

    function getStyleFile( source ) {
        if ( source ) {
            return transformResponse( fs.readFileSync( source ) );
        } else {
            throwError( 'ERROR: No source file specified.' );
        }
    }

    function styleInject( file, enc, callback ) {
        /*jshint validthis:true*/

        self = this;

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

            contents = contents.replace( new RegExp( option.match_pattern, 'gi' ), function ( match, parameters ) {
                var attrs = getAttributes( parameters );
                return getStyleFile( option.path + attrs.src );
            } );

            file.contents = new Buffer( contents );
            this.push( file );
            return callback();
        }

        return callback();
    }

    return through.obj( styleInject );
};
