(function () {
	var $, Control, Popup, Templates, index, width, height;

	Control = require('Control/Control');
	Templates = require('Templates/Templates');


	module.exports = Control.create('Layout', {
		init : function () {
			this.append(
				'<meta name="twitter:card" content="summary">' +
				'<meta name="twitter:domain" content="stackoverflow.com">' +
				'<meta property="og:type" content="website">' +
				'<meta name="twitter:title" property="og:title" itemprop="title name" content="How to set dynamic Meta Tags and Open Graph?">' +
				'<meta property="og:url" content="http://zuluf.github.io/jpots/">'
			);
		}
	});
})();