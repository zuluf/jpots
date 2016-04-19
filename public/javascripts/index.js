(function () {
	var Layout, Meta;

	Layout = require('./Layout/Layout');
	Meta = require('./Meta');

	new Meta('head');
	new Layout('body');
}());