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
		if (canSet && noMoreProperty) {
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

/**
 * @desc Delete a given property of an object, taking care of deleting the empty objects possible generated by the
 * deletion too.
 *
 * @param  {Object}  object      - The concerned object.
 * @param  {String}  path        - The concerned path.
 * @param  {Boolean} [cleanup]   - Delete the empty objects generated by the deletion.
 *                                 Default: true
 */
function del(object, path, cleanup) {
	if (cleanup === undefined) {
		cleanup = true;
	}

	// The process for deleting a property from an object and an element from an array are not the same
	function deleteProperty(objectOrArray, key) {
		if (Array.isArray(objectOrArray)) {
			objectOrArray.splice(key, 1);
		} else {
			delete objectOrArray[key];
		}
	}

	// This object will work as a stack and store the path we will got through in order to delete recursively all empty
	// objects at the end of the process
	var deleters = [];

	var properties = path.split('.');
	var tmpObject = object;

	while (properties.length > 0) {
		var currentProperty = properties.shift();

		// Trying to delete an unexisting property ?
		if (tmpObject[currentProperty] === undefined) {
			break;
		}

		// Delete if last property
		if (properties.length === 0) {
			deleteProperty(tmpObject, currentProperty);
			break;
		}

		// Keep trace of the path we go through
		deleters.push({ base: tmpObject, property: currentProperty});

		// Move deeper into the object
		tmpObject = tmpObject[currentProperty];
	}

	// Delete all empty objects
	if (cleanup) {
		for (var i = 0, iMax = deleters.length; i < iMax ; i += 1) {
			var deleter = deleters.pop();
			var baseObject = deleter.base;
			var objectProperty = deleter.property;

			// Quit the process if there is at least one non-empty object
			if (Object.keys(baseObject[objectProperty]).length > 0) {
				break;
			}

			deleteProperty(baseObject, objectProperty);
		}
	}
}

// #####################################################################################################################

// -- EXPOSED FUNCTIONS --

exports.get = get;
exports.set = set;
exports.del = del;
