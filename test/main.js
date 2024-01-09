/*global describe, it*/
'use strict';

var fs = require( 'fs' ),
    es = require( 'event-stream' ),
    assert = require('assert')

require( 'mocha' );

delete require.cache[ require.resolve( '../' ) ];

var Vinyl = require('vinyl'),
    styleInject = require( '../' );

describe( 'gulp-style-inject', function () {

    it( 'should produce expected file via buffer', function ( done ) {

        var srcFile = new Vinyl( {
            path: 'test/fixtures/index.html',
            cwd: 'test/',
            base: 'test/fixtures',
            contents: fs.readFileSync( 'test/fixtures/index.html' )
        } );

        var expectedFile = new Vinyl( {
            path: 'test/expected/index.html',
            cwd: 'test/',
            base: 'test/expected',
            contents: fs.readFileSync( 'test/expected/index.html' )
        } );

        var stream = styleInject();

        stream.on( 'error', function ( err ) {
            assert.ok( typeof err === 'object' );
            done( err );
        } );

        stream.on( 'data', function ( newFile ) {

            assert.ok( typeof newFile === 'object' );
            assert.ok( newFile.contents );

            assert.equal(String( newFile.contents ), String( expectedFile.contents ) );
            
            done();
        } );

        stream.write( srcFile );
        stream.end();
    } );

    it( 'should error on stream', function ( done ) {

        var srcFile = new Vinyl( {
            path: 'test/fixtures/index.html',
            cwd: 'test/',
            base: 'test/fixtures',
            contents: fs.createReadStream( 'test/fixtures/index.html' )
        } );

        var stream = styleInject();

        stream.on( 'error', function ( err ) {
            assert.ok( typeof err === 'object' );
            done();
        } );

        stream.on( 'data', function ( newFile ) {
            newFile.contents.pipe( es.wait( function ( err ) {
                done( err );
            } ) );
        } );

        stream.write( srcFile );
        stream.end();
    } );

} );