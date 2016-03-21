(function () {
	var Script, Handlebars;

	Script = require('Script/Script');
	Handlebars = require('handlebars');

	module.exports = Script.create(
		'Templates', {
			templates : {},

			init: function () {
				var template;

				if (typeof Handlebars === "undefined") {
					throw Error('Templates: Handlebars are not available');
				}

				if (typeof jpotsTemplates === "undefined") {
					throw Error('Templates: global templates are not available');
				}

				for (template in jpotsTemplates) {
					this.templates[template] = Handlebars.compile(jpotsTemplates[template]);
				}
			},

			render : function (template, data) {
				var compiled;

				if (!template || typeof this.templates[template] !== "function") {
					throw Error('Templates: "' + template + '"" is not defined');
				}

				data = typeof data === "object" ? data : {};

				return this.templates[template](data);
			}
		}

	)();
})();