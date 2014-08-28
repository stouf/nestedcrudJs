var path = require('path');
var assert = require('assert');

var nestedcrud = require(path.resolve(__dirname, '../index.js'));



describe('Run a series a tests for the `set` operation', function () {

	it('Run a simple `set` operation.', function () {
		// Object to manipulate
		var object = {
			name: 'stouf',
			age: 99,
		};

		// Operation
		nestedcrud.set(object, 'company', { name: 'Wizcorp', location: 'Tokyo' });

		// Tests
		assert.deepEqual(object.company.name, 'Wizcorp');
		assert.deepEqual(object.company.location, 'Tokyo');
	});

	it('Run a `set` operation on an originally unexisting property', function () {
		// Object to manipulate
		var object = {
			name: 'stouf',
			age: 99,
		};

		// Operations
		nestedcrud.set(object, 'company.name', 'Wizcorp');
		nestedcrud.set(object, 'company.location', 'Tokyo');

		// Tests
		assert.deepEqual(object.company.name, 'Wizcorp');
		assert.deepEqual(object.company.location, 'Tokyo');
	});

	it('Test the override behavior of the `set` operation', function () {
		// Object to manipulate
		var object = {
			name: 'stouf',
			age: 99,
		};

		// Basic operations
		nestedcrud.set(object, 'company.name', 'Wizcorp');
		nestedcrud.set(object, 'company.location', 'Paris');

		// Overriding operation
		nestedcrud.set(object, 'company.location', 'Tokyo', true);
		assert.deepEqual(object.company.location, 'Tokyo');

		// Non-overriding operation
		nestedcrud.set(object, 'company.location', 'Paris');
		assert.deepEqual(object.company.location, 'Tokyo');
	});
});
