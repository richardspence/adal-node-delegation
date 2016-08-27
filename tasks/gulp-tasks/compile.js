var config = require('./config');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var path = require('path');
var tsProject = ts.createProject('tsconfig.json');

module.exports = function (cb) {
	var errors = [];
	var tsResult = gulp.src(module.exports.src)
		.pipe(sourcemaps.init())
		.pipe(ts(tsProject).on('error', function (err) {
			errors.push(err);
		}));

	merge(
		tsResult.js.pipe(sourcemaps.write('.', {
			sourceRoot: s => {
				//determines the relative path to src from the file.
				var prefix = path.resolve('src');
				var destPrefix = path.resolve(config.outputFolder);
				//get the directory name of the destination filename.
				var destPath = path.resolve(s.path).replace(prefix, destPrefix);
				//get just the directory.
				destPath = path.dirname(destPath); 
				var relative = path.relative(destPath, prefix);
				
				//convert path with / seprator (for windows)
				relative = relative.replace(/\\/g, '/');

				return relative;
			},
			destPath: config.outputFolder,
			includeContent: false,
		}))
			.pipe(gulp.dest(config.outputFolder)),
		tsResult.dts.pipe(gulp.dest(config.outputFolder))
	).on('finish', function () {
		if (errors.length !== 0) {
			// Do not return the error array, because it is already printed to the console.
			// Reject by returning a simple string.
			cb('There are errors in the TypeScript code.');
		} else {
			cb();
		}
	});
};
module.exports.src = ['src/**/*.ts', 'src/**/*.tsx'];