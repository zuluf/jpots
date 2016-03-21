(function () {

	/**
	 * Add a Object.create polyfill
	 *
	 * @param  {Object} object
	 * @param  {Object} props
	 * @return {Object} cloned object
	 */
	if (Object && typeof Object.create !== "function") {
		// Production steps of ECMA-262, Edition 5, 15.2.3.5
		// Reference: http://es5.github.io/#x15.2.3.5
		Object.create = (function() {
			// To save on memory, use a shared constructor
			function Temp() {}

			// make a safe reference to Object.prototype.hasOwnProperty
			var hasOwn = Object.prototype.hasOwnProperty;

			return function (O) {
				// 1. If Type(O) is not Object or Null throw a TypeError exception.
				if (typeof O != 'object') {
					throw TypeError('Object prototype may only be an Object or null');
				}

				// 2. Let obj be the result of creating a new object as if by the
				//    expression new Object() where Object is the standard built-in
				//    constructor with that name
				// 3. Set the [[Prototype]] internal property of obj to O.
				Temp.prototype = O;
				var obj = new Temp();
				Temp.prototype = null; // Let's not keep a stray reference to O...

				// 4. If the argument Properties is present and not undefined, add
				//    own properties to obj as if by calling the standard built-in
				//    function Object.defineProperties with arguments obj and
				//    Properties.
				if (arguments.length > 1) {
					// Object.defineProperties does ToObject on its first argument.
					var Properties = Object(arguments[1]);
					for (var prop in Properties) {
						if (hasOwn.call(Properties, prop)) {
							obj[prop] = Properties[prop];
						}
					}
				}

				// 5. Return obj
				return obj;
			};
		})();
	}

	/**
	 * Add a Object.clone
	 *
	 * @param  {Object} object
	 * @return {Object} cloned object
	 */
	if (Object && typeof Object.clone !== "function") {
		Object.clone = function Clone(original) {
			var clone;

			if (!original || typeof original !== "object") {
				throw "Object.clone can only extend non empty objects";
			}

			clone = {};

			for (var prop in original) {
				if (Object.prototype.hasOwnProperty.call(original, prop)) {
					clone[prop] = original[prop];
				}
			}

			return clone;
		}
	}

	/**
	 * Add a Object.extend
	 *
	 * @param  {defaults} object
	 * @param  {props}    object
	 * @return {Object}
	 */
	if (Object && typeof Object.extend !== "function") {
		Object.extend = function Extend(defaults, props, extra) {
			var extended;

			if (!defaults || !props || typeof defaults !== "object" || typeof props !== "object") {
				throw "Object.extend can only extend non empty objects";
			}

			extended = Object.clone(defaults);

			for (var prop in props) {
				if (Object.prototype.hasOwnProperty.call(props, prop)) {
					extended[prop] = props[prop];
				}
			}

			if (extra && typeof extra === "object") {
				for (var prop in extra) {
					if (Object.prototype.hasOwnProperty.call(extra, prop)) {
						extended[prop] = extra[prop];
					}
				}
			}

			return extended;
		}
	}

	/**
	 * Add a Object.keys polyfill
	 *
	 * @param  {Object} object
	 * @return {Array}  list of object property names
	 */
	if (Object && typeof Object.keys !== "function") {
		Object.keys = function (object) {
			var keys = [];

			if (object && typeof object === "object") {
				for (var prop in object) {
					if (object.hasOwnProperty((prop))) {
						keys.push(prop);
					}
				}
			}

			return keys;
		}
	}

	/**
	 * Add a Array.indexOf polyfill
	 *
	 * @param  {Mixed} 	element
	 * @param  {Number} from
	 * @return {Array}  list of object property names
	 */
	if (Array && typeof Array.prototype.indexOf !== "function") {
		Array.prototype.indexOf = function (element, from) {
			var length;

			length = this.length;
			from = Number(from) || 0;
			from = (from < 0) ? Math.ceil(from) : Math.floor(from);

			if (from < 0) {
				from += length;
			}

			for(; from < length; from++) {
				if (from in this && this[from] === element) {
					return from;
				}
			}

			return -1;
		}
	}

	/**
	 * Add a Array.filter polyfill
	 *
	 * @param  {Function} 	callback
	 * @param  {Number} from
	 * @return {Array}  list of object property names
	 */
	if (Array && typeof Array.prototype.filter !== "function") {
		Array.prototype.filter = function (callback, instance) {
			var length, result, value;

			length = this.length;
			result = [];

			if (typeof callback !== "function") {
				throw new TypeError('Array.prototype.filter callback must be a function');
			}

			for(var i = 0; i < length; i++) {
				if (i in this) {
					value = this[i];

					if (typeof instance !== "undefined" ?
						callback.call(instance, value, i, this) :
						callback(value, i, this)) {
						result.push(value);
					}
				}
			}

			return result;
		}
	}

	/**
	 * Add a Array.map polyfill
	 *
	 * @param  {Function} 	callback
	 * @param  {Number} from
	 * @return {Array}  list of object property names
	 */
	if (Array && typeof Array.prototype.map !== "function") {
		Array.prototype.map = function (callback, instance) {
			var length, result, value;

			length = this.length;
			result = [];

			if (typeof callback !== "function") {
				throw new TypeError('Array.prototype.map callback must be a function');
			}

			for(var i = 0; i < length; i++) {
				if (i in this) {
					value = this[i];
					value = typeof instance !== "undefined" ?
						callback.call(instance, value, i, this) :
						callback(value, i, this);

					result.push(value);
				}
			}

			return result;
		}
	}

	/**
	 * Add a Function.bind polyfill
	 *
	 * @param  {Function} callable
	 * @return {Function} new instance of the bind callable function
	 */
	if (Function && typeof Function.prototype.bind !== "function") {
		Function.prototype.bind = function (callable) {
			if (typeof this !== "function") {
				throw new TypeError("Function.prototype.bind - object is not callable");
			}

			var slice = Array.prototype.slice,
				args = slice.call(arguments, 1),
				instance = this,
				clone = function() {},
				cloned = function() {
					return instance.apply(this instanceof clone ? this : callable || window, args.concat(slice.call(arguments)));
				};
			clone.prototype = this.prototype;
			cloned.prototype = new clone();
			return cloned;
		};
	}

	// Production steps of ECMA-262, Edition 5, 15.4.4.18
	// Reference: http://es5.github.io/#x15.4.4.18
	if (Array && typeof Array.prototype.forEach !== "function") {
		Array.prototype.forEach = function(callback, thisArg) {
			var T, k;

			if (this == null) {
				throw new TypeError(' this is null or not defined');
			}

			// 1. Let O be the result of calling ToObject passing the |this| value as the argument.
			var O = Object(this);

			// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
			// 3. Let len be ToUint32(lenValue).
			var len = O.length >>> 0;

			// 4. If IsCallable(callback) is false, throw a TypeError exception.
			// See: http://es5.github.com/#x9.11
			if (typeof callback !== "function") {
				throw new TypeError(callback + ' is not a function');
			}

			// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
			if (arguments.length > 1) {
				T = thisArg;
			}

			// 6. Let k be 0
			k = 0;

			// 7. Repeat, while k < len
			while (k < len) {
				var kValue;

				// a. Let Pk be ToString(k).
				//   This is implicit for LHS operands of the in operator
				// b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
				//   This step can be combined with c
				// c. If kPresent is true, then
				if (k in O) {
					// i. Let kValue be the result of calling the Get internal method of O with argument Pk.
					kValue = O[k];

					// ii. Call the Call internal method of callback with T as the this value and
					// argument list containing kValue, k, and O.
					callback.call(T, kValue, k, O);
				}

				// d. Increase k by 1.
				k++;
			}

			// 8. return undefined
		};
	}
})();