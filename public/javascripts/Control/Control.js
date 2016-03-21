(function(){
	var $, Helpers, Templates, defaultEvents, defaults, Control, jClean;

	Helpers = require('Helpers/Helpers');
	Templates = require('Templates/Templates');
	$ = require('jquery');
	require('libs/polyfills');

	/**
	 * List of event names available for controls element binding
	 *
	 * @var {Array} defaultEvents
	 */
	defaultEvents = ["change", "click", "contextmenu", "dblclick", "keydown", "keyup",
		"keypress", "mousedown", "mousemove", "mouseout", "mouseover",
		"mouseup", "reset", "resize", "scroll", "select", "submit", "focusin",
		"focusout", "mouseenter", "mouseleave",
		"touchstart", "touchmove", "touchcancel", "touchend", "touchleave",
		"inserted","removed"
	];

	/**
	 * Original jQuery.cleanData function holder
	 *
	 * @var {Function} jClean
	 */
	jClean = $.cleanData;


	global.jQuery = $;
	/**
	 * Overwritten jQuery.cleanData function
	 *
	 * @var {Function} $.cleanData
	 */
	$.cleanData = function(elems) {
		for ( var i = 0, elem; (elem = elems[i]) !== undefined; i++ ) {
			$(elem).triggerHandler("destroyed");
		}
		// call the overwriten jQuery clean fn
		jClean(elems);
	};

	/**
	 * Default control methods holder
	 *
	 * @var {Object} defaults
	 */
	defaults = {
		/**
		 * Default control options holder
		 *
		 * @var (Object) this.defaults
		 */
		defaults : {},

		/**
		 * Default abstract control init function
		 *
		 * @return void
		 */
		init: function init () {},

		/**
		 * Default abstract onSetup init function
		 *
		 * @return void
		 */
		onSetup: function onSetup () {},

		/**
		 * Default abstract onBind function
		 *
		 * @return void
		 */
		onBind: function onBind () {},

		/**
		 * Controls setup function; Sets control element and options properties, and creates a control instance
		 *
		 * @param  {Object} element dom node element
		 * @param  {Object} control state options
		 * @return {Object} control instance
		 */
		setup : function setup (element, options) {

			this.element = element || this.element || $('div');
			this.options = Object.extend(this.defaults, (options || this.options || {}));

			return this.instance();
		},

		/**
		 * Binds control events, creates default options, triggers control init
		 *
		 * @return {Object} control instance
		 */
		instance: function instance () {
			var events, callback, defaults, selectors, eventName;

			// bind events
			if (!this.isBound()) {
				defaults = defaultEvents.concat(Object.keys($.event.special));

				// trigger onBind hook
				this.onBind(this.element, this.options);

				for (var property in this) {

					events = [];
					callback = this[property];

					if (typeof callback === "function") {

						if (~property.indexOf(' ')) {
							selectors = property.split(' ');
							events = [selectors.pop(), selectors.join(' ')];
						} else if (~defaults.indexOf(property)) {
							events.push(property);
						}

						if (events.length) {
							events.push(function(callback, event) {
								callback.call(this, event, $(event.target));
							}.bind(this, callback));

							this.element.on.apply(this.element, events);
						}

					}
				}

				// bind element destroyed
				this.element.on('destroyed', this.destroy.bind(this));
			}

			if (this.defaults) {
				this.options = $.extend(this.defaults, this.options);
			}

			this.onSetup(this.element, this.options);

			this.init(this.element, this.options);

			return this;
		},

		/**
		 * Removes binded events from controls element
		 *
		 * @return void
		 */
		destroy: function destroy () {
			if (this.element && this.element.length) {
				this.unbind();
			}
		},

		/**
		 * Unbind control events, delete the options and element objects
		 *
		 * @return void
		 */
		unbind: function unbind () {
			if (this.element && this.element.length) {
				for (var i in this) {
					if (~i.indexOf(' ') && typeof this[i] === "function") {
						this.element.off(i.split(' ').pop(), this[i]);
					}
				}

				this.element = null;
				this.options = null;

				delete this;
			}
		},

		/**
		 * Removes controls element;
		 * Removing of the element will also trigger the 'destroyed' event for the control instance
		 *
		 * @return void
		 */
		remove : function remove () {
			if (this.element) {
				this.element.remove();
			}
		},

		/**
		 * Returns current control element bound events
		 *
		 * @return {Object}
		 */
		getEvents : function getEvents () {
			return this.element ? $._data(this.element[0], 'events') : undefined;
		},

		/**
		 * Check's if the current control element has bound events
		 *
		 * @return {Boolean}
		 */
		isBound : function isBound () {
			return !!this.getEvents();
		},

		/**
		 * Default control element is wrapper
		 *
		 * @return void
		 */
		is : function is () {
			return this.element && $.fn.is.apply(this.element, arguments);
		},

		/**
		 * jQuery .html() wrapper for the controls element
		 *
		 * @return {String}
		 */
		html : function html (html) {
			return this.element && this.element.html(html);
		},

		/**
		 * jQuery .append() wrapper for the controls element
		 *
		 * @return {String}
		 */
		append : function append (html) {
			return this.element && this.element.append(html);
		},

		/**
		 * Control.template() method, parses the given template
		 * and sets the result as element html
		 *
		 * @return {String}
		 */
		template : function template (template, data) {
			return this.element && this.html(Templates.render(template, data));
		},

		/**
		 * jQuery .text() wrapper for the controls element
		 *
		 * @return {String}
		 */
		text : function text (text) {
			return this.element && this.element.text(text);
		},

		/**
		 * Add display: none css class to the control element
		 *
		 * @return {Object} jQuery element
		 */
		hide : function hide () {
			return this.element && this.element.addClass('dn');
		},

		/**
		 * Removes display: none css class from the control element
		 *
		 * @return {Object} jQuery element
		 */
		show : function show () {
			return this.element && this.element.removeClass('dn');
		},

		/**
		 * jQuery .val() wrapper for the controls element
		 *
		 * @return {Mixed} value of the controls element
		 */
		val : function val () {
			return this.element && this.element.val.apply(this.element, arguments);
		},

		/**
		 * jQuery .has() wrapper for the controls element
		 *
		 * @return {Mixed} value of the controls element
		 */
		has : function has () {
			return this.element && this.element.has.apply(this.element, arguments);
		}
	};

	/**
	 * Control constructor function; Creates new control for the given parameters with default functions
	 *
	 * @param 	{Object} 	element		control element
	 * @param 	{Object} 	options		control options
	 * @return  {Object}    control object
	 */
	Control = function Control (element, options) {

		if (typeof this === "function") {
			return new this(element, options);
		}

		element = typeof element === "string" ? $(element) : element;

		if ((this.element && this.element.is(element)) ||
			(this.element && typeof element === "undefined")) {
			return this;
		}

		if (typeof element !== "object" || !element.length) {
			throw Error('Control [' + arguments.callee.caller.toString() + ']: missing element');
		}

		this.element = element;
		this.options = options;

		return this.setup(element, options);
	}

	/**
	 * Control create function for registering new controls
	 *
	 * @param  {String} name  		name of the registered control
	 * @param  {Object} control  	new control properties to merge with the defaults
	 * @return {Object} registered control
	 */
	Control.create = function ControlCreate (name, control) {
		var instance;

		instance = Helpers.functionRename(name, Control);

		instance.prototype = Object.extend(instance.prototype, defaults, control);

		return instance.bind(instance);
	}

	/**
	 * Add Control to the global scope
	 */
	if (typeof module !== "undefined" && typeof module.exports !== 'undefined') {
		module.exports = Control;
	} else if (typeof window !== "undefined") {
		window.Control = Control;
	} else {
		return Control;
	}
})();