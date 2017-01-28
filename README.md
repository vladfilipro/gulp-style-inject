
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
var styleInject = require("gulp-style-inject");

gulp.src("./src/*.html")
	.pipe(styleInject())
	.pipe(gulp.dest("./dist"));
```

All your html files should include the following tag:

```html
    <!-- inject-style src="./path/file.css" -->
```

Example:
```html
<div>
<!-- inject-style src="./test/p.css" -->
<!-- inject-style src="./test/span.css" -->
    <p>Some text</p>
    <span>Some other text</span>
</div>
```
Output
```html
<div>
<style>
p {
    background-color: red;
}
</style>
<style>
span {
    background-color: green;
}
</style>
    <p>Some text</p>
    <span>Some other text</span>
</div>
```

## Options

The plugin can be used with an options object

```javascript
var styleInject = require("gulp-style-inject");

gulp.src("./src/*.html")
	.pipe(styleInject({
		encapsulated: false,
		path: './test/styles'
	}))
	.pipe(gulp.dest("./dist"));
```

Available options:
- *encapsulated*: Type boolean, (default: true) - Specifies if the style code should be injected using a style tag
- *path*: Type string, (default: '') - Specifies the base path of all style files
- *match_pattern*: Type regular expression, (default: <\\!--\\s*inject-style\\s*(.*?)\\s*-->) - Specifies the pattern to look for when replacing

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
