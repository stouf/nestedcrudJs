var path = require('path');
var assert = require('assert');

var nestedcrud = require(path.resolve(__dirname, '../index.js'));



describe('Run a series a tests for the `del` operation', function () {
	it('Delete a key from a simple object', function () {
		var object = {
			name: 'stouf',
			companies: {
				main: {
					name: 'Wizcorp',
					location: 'Japan'
				}
			}
		};

		nestedcrud.del(object, 'name');
		nestedcrud.del(object, 'companies.main.location');

		assert.deepEqual(object.name, undefined);
		assert.deepEqual(object.companies.main.location, undefined);
	});

	it('Delete a key from an array', function () {
		var object = {
			name: 'stouf',
			shoes: ['DC Shoes', 'Puma'],
			companies: {
				main: {
					name: 'Wizcorp',
					location: 'Japan'
				}
			}
		};

		nestedcrud.del(object, 'shoes.1');

		assert.deepEqual(object.shoes.length, 1);
		assert(object.shoes.indexOf('Puma') === -1);
	});

	it('Delete a key from an object that require parent objects to be deleted too', function () {
			var object = {
			name: 'stouf',
			shoes: ['DC Shoes', 'Puma'],
			companies: {
				main: {
					name: 'Wizcorp',
					location: 'Japan'
				}
			}
		};

		nestedcrud.del(object, 'companies.main.name');
		nestedcrud.del(object, 'companies.main.location');

		assert.deepEqual(object.companies, undefined);
	});
});
