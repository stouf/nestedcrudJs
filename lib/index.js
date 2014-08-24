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


// #####################################################################################################################

// -- EXPOSED FUNCTIONS --

exports.get = get;
