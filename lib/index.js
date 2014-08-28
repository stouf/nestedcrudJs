/**
 * @module nestedcrud
 */


/**
 * @desc Get a property from an object, whatever its depth in the object.
 *
 * @param {Object} object - The concerned object.
 * @param {String} path   - The path of the targeted property (i.e "companies.main.name").
 *
 * @return {*} Your targeted property, or `undefined`.
 */
function get(object, path) {
	var properties = path.split('.');
	var currentProperty = properties.shift();
	var tmpObject = object;

	while (properties.length > 0) {
		tmpObject = tmpObject[currentProperty];
		if (tmpObject === undefined) {
			return undefined;
		}
		currentProperty = properties.shift();
	}
	return tmpObject[currentProperty];
}

/**
 * @desc Set a given value to an object at a given path, regardless the existence of intermediate properties normally
 *       necessary for JavaScript.
 *
 * @param {Object}   object     - The concerned object.
 * @param {String}   path       - The concerned path.
 * @param {*}        value      - The value to set
 * @param {Boolean}  [override] - Tell whether we should override existing value (false) or not (true)
 *                                Default: true
 */
function set(object, path, value, override) {
	var properties = path.split('.');
	var tmpObject = object;

	while (properties.length > 0) {
		var currentProperty = properties.shift();

		// The info we need for each iteration
		var noMoreProperty = properties.length === 0;
		var endOfObject = !tmpObject[currentProperty];
		var canSet = (endOfObject || (!endOfObject && override));

		// Do we write the value and exit ?
		if (canSet && noMoreProperty){
			tmpObject[currentProperty] = value;
			return;
		}

		// Do we need to create an empty object in order to progress ?
		if (!noMoreProperty && endOfObject) {
			tmpObject[currentProperty] = {};
		}

		// Move forward within the object
		tmpObject = tmpObject[currentProperty];
	}
}

// #####################################################################################################################

// -- EXPOSED FUNCTIONS --

exports.get = get;
exports.set = set;
