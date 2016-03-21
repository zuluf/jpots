(function(){
	var scripts, Script, Helpers, defaults;

	Helpers = require('Helpers/Helpers');

	require('libs/polyfills');

	/**
	 * Default script methods holder
	 *
	 * @var {Object} defaults
	 */
	defaults = {
		/**
		 * Script noop defaults
		 */
		defaults : {},

		/**
		 * Default abstract script init function
		 *
		 * @return void
		 */
		init: function init () {},

		/**
		 * Script setup function; Sets script options properties, and calls script init function
		 *
		 * @param  {Object} options 	script options
		 * @return {Mixed}
		 */
		setup : function setup (options) {

			this.options = Object.extend(this.defaults, (options || this.options || {}));

			this.init(this.options);

			return this;
		}
	};

	/**
	 * Script constructor function; Creates new script for the given parameters extended with default functions
	 *
	 * @param 	{Object} 	options		script options
	 * @return  {Object}    script object
	 */
	Script = function Script (options) {
		if (typeof this === "function") {
			return new this(options);
		}

		return this.setup(options);
	};

	/**
	 * Script create function
	 *
	 * @param  {String} name  		name of the registered script
	 * @param  {Object} script   	new script properties to merge with the defaults
	 * @return {Object} registered script
	 */
	Script.create = function ScriptCreate (name, script) {
		var instance;

		instance = Helpers.functionRename(name, Script);

		instance.prototype = Object.extend(instance.prototype, defaults, script);

		return instance.bind(instance);
	}

	/**
	 * Add Script to the global scope
	 */
	if (typeof module !== "undefined" && typeof module.exports !== 'undefined') {
		module.exports = Script;
	} else if (typeof window !== "undefined") {
		window.Script = Script;
	} else {
		return Script;
	}

})();