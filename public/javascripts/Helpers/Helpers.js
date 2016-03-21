(function () {
	/**
	 * Application helper functions
	 */
	module.exports = {
		/**
		 * Function rename
		 *
		 * @param  {String} name  		new name of the function
		 * @param  {Function} fn  	 	function to rename
		 * @return {Function}
		 */
		functionRename : function (name, fn) {

			name = this.sanitizeVarName(name);

			return (
				new Function( "return function (call) { return function " + name + " () { return call(this, arguments) }; };" ) () (
					Function.apply.bind(fn)
				)
			);
		},

		/**
		 * Function sanitizeVarName returns valid variable/function name parsed string
		 *
		 * @param  {String} varname		variable/function var name
		 * @return {String}
		 */
		sanitizeVarName: function (varName) {
			if (typeof varName !== "string") {
				throw Error('Variable [' + varName + '] is not a string type.');
			}

			return varName.replace(/^[^a-zA-Z_]+|[^a-zA-Z_0-9]+/g, '');
		}
	}
})();