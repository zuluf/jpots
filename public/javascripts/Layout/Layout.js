(function () {
	var $, Control, Templates, Popup, Stats;

	Templates = require('Templates/Templates');
	Control = require('Control/Control');
	Popup = require('Popup/Popup');
	Stats = require('Stats/Stats');
	$ = require('jquery');

	module.exports = Control.create(
		'Layout', {
			lunaticTemplate : 'Layout.lunatic',

			lunaticToggle: function () {
				var lunatic = $('[data-handler="lunatic"]');

				if (lunatic.length) {
					lunatic.remove();
					return false;
				} else {
					this.element.append(Templates.render(this.lunaticTemplate));
				}

				return true;
			},

			'[data-action="popup-append"] click' : function () {
				new Popup('[data-handler="popup"]', {
					stats : new Stats('[data-handler="stats"]'),
					prepend : false
				});
			},

			'[data-action="popup-prepend"] click' : function () {
				new Popup('[data-handler="popup"]', {
					stats : new Stats('[data-handler="stats"]'),
					prepend : true
				});
			},

			'[data-action="max-zindex"] click' : function (event, element) {
				if (this.lunaticToggle()) {
					element.text('Remove lunatic z-index element from the DOM')
				} else {
					element.text('Add a lunatic z-index element to DOM');
				}
			}
		}
	);
}());

