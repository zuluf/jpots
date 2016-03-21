(function () {
	var $, Control, Popup;

	Control = require('Control/Control');
	Popup = require('Popup/Popup');
	$ = require('jquery');

	module.exports = Control.create(
		'Stats', {
			data : [],

			view : 'Stats.stats',

			init: function () {
				this.render();
			},

			render : function (data) {
				this.template(this.view, {
					data : data || this.data
				});
			},

			append : function (stat) {
				this.add(stat);
				this.render();
			},

			add : function (stat) {
				if (!stat || !stat.name) {
					return;
				}

				stat.parseName = function () {
					return this.name.replace('-', ' #');
				}

				this.data.forEach(function (item, index) {
					if (item.name === stat.name) {
						this.data[index] = stat;
						stat = false;
					}
				}.bind(this));

				if (stat) {
					this.data.push(stat);
				}
			},

			'[data-handler="popup-start"] click' : function (event, element) {
				return new Popup('[data-handler="' + element.data('popup') + '"]');
			}
		}
	);
}());

