var path = require('path');
var assert = require('assert');

var nestedcrud = require(path.resolve(__dirname, '../index.js'));



describe('Run a series a tests for the `get` operation', function () {
	it('Run a simple `get` operation.', function () {
		var object = {
			name: 'stouf',
			companies: {
				main: {
					name: 'Wizcorp',
					location: 'Japan'
				}
			}
		};

		assert(nestedcrud.get(object, 'name') === 'stouf');
		assert(nestedcrud.get(object, 'na') === undefined);
		assert(nestedcrud.get(object, 'double.na') === undefined);
		assert(nestedcrud.get(object, 'companies.main.name') === 'Wizcorp');
		assert(nestedcrud.get(object, 'companies.main').name === 'Wizcorp');
	});

	it('Get an array out of an object', function () {
		var object = {
			name: 'Slash',
			guitars: [
				'les paul 1',
				'les paul 2',
				'les paul 3',
			]
		};

		assert(nestedcrud.get(object, 'guitars.1') === 'les paul 2');
		assert(nestedcrud.get(object, 'guitars.5') === undefined);
		assert(nestedcrud.get(object, 'guitars.-1') === undefined);

		object = {
			name: 'Slash',
			guitars: [
				{ brand: 'gibson', model: 'les paul 1' },
				{ brand: 'gibson', model: 'les paul 2' },
				{ brand: 'gibson', model: 'les paul 3' },
			]
		};

		assert(nestedcrud.get(object, 'guitars.2.brand') === 'gibson');
	});
});
