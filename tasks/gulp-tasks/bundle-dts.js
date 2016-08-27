var config = require('./config');
var package = require('../../package.json')
var dts = require('dts-bundle');

module.exports = function (cb) {
    dts.bundle(
		{
            baseDir: config.outputFolder,
			emitOnIncludedFileNotFound: true,
			emitOnNoIncludedFileNotFound: true,
			exclude: /specs/,
			main: config.outputFolder + '/index.d.ts',
			name: package.name,
		});

	cb();

}

module.exports.dependencies = ['compile'];
