(function () {
	var $, Control, Popup, Templates, index, width, height;

	Control = require('Control/Control');
	Templates = require('Templates/Templates');
	$ = require('jquery');
	require('jquery-popup-overlay');

	index = 1;
	width = 90;
	height = 90;

	Popup = Control.create(
		'Popup', {

			popupOptions : {
				autozindex: true,
				autoopen: true,
				background: true
			},

			init: function () {
				var options;

				if (!this.element.data('action')) {
					return this.add();
				}

				options = $.extend({}, this.popupOptions, this.options);

				this.element.popup(options);

				setTimeout(function () {
					this.stat();
				}.bind(this), 30);
			},

			stat : function (element) {
				var zindex;

				element = element || this.element;

				zindex = element.parent().css('z-index');

				element.find('[data-handler="z-index"]').html(zindex);

				this.options.stats.append({
					'name' : element.data('handler'),
					'zindex' : zindex
				});
			},

			add : function () {
				var body, element;

				body = $('body');

				if (width > 70 && height > 70) {
					width -= 2;
					height -= 2;
				}

				body.append(Templates.render('Popup.popup', {
					index : index++,
					width : width,
					height : height
				}));

				element = body.find('.jpots-popup:last');

				new Popup('[data-handler="popup-' + (index - 1) + '"]');
			},

			show : function (element) {
				element = typeof element === "string" ? $(element) : element;

				if (!element.length) {
					return;
				}

				element.popup('show');

				setTimeout(function () {
					this.stat(this);
				}.bind(element), 30);
			},

			'[data-action="popup-add"] click': function () {
				this.add();
			},

			'[data-action="popup-close"] click': function () {
				this.element.popup('hide');
			},

			'[data-action="popup-close-all"] click': function () {
				$('.jpots-popup').each(function () {
					$(this).popup('hide');
				});
			},

			'form submit' : function (event) {
				event.preventDefault();
			}
		}
	);

	module.exports = Popup;
}());

