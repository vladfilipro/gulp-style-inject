
# gulp-style-inject
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

> style-inject plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-style-inject` as a development dependency:

```shell
npm install --save-dev gulp-style-inject
```

Then, add it to your `gulpfile.js`:

```javascript
var style-inject = require("gulp-style-inject");

gulp.src("./src/*.html")
	.pipe(styleInject())
	.pipe(gulp.dest("./dist"));
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-style-inject
[npm-image]: https://badge.fury.io/js/gulp-style-inject.png

[travis-url]: http://travis-ci.org/vladfilipro/gulp-style-inject
[travis-image]: https://secure.travis-ci.org/vladfilipro/gulp-style-inject.png?branch=master

[coveralls-url]: https://coveralls.io/r/vladfilipro/gulp-style-inject
[coveralls-image]: https://coveralls.io/repos/vladfilipro/gulp-style-inject/badge.png

[depstat-url]: https://david-dm.org/vladfilipro/gulp-style-inject
[depstat-image]: https://david-dm.org/vladfilipro/gulp-style-inject.png
