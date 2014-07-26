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
 * @desc Insert a property in an object, whatever its depth in the object.
 *       Please note that this function can override or not an already existing value, depending on its parameter
 *       `override`.
 *
 * @param {Object}  object     - The concerned object.
 * @param {String}  path       - The path where the value should be inserted (i.e "companies.main.name").
 * @param {*}       value      - The value to insert.
 * @param {Boolean} [override] - Tell whether this function should override existing values (default: true)
 *
 * @return {*} Your targeted property, or `undefined`.
 */
function insert(object, path, value, override) {
	var properties = path.split('.');
	var currentProperty = properties.shift();
	var tmpObject = object;

	while (properties.length > 0) {
		tmpObject = tmpObject[currentProperty];
		if (tmpObject === undefined) {

		}
		currentProperty = properties.shift();
	}
	return tmpObject[currentProperty];
}


// #####################################################################################################################

// -- EXPOSED FUNCTIONS --

exports.get = get;
