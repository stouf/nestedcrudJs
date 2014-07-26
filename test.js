var path = require('path');
var assert = require('assert');

var nestedcrud = require(path.resolve(__dirname, 'index.js'));




function simpleGet() {
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
}



function getArray() {
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
}




// #####################################################################################################################

// --- LAUNCH THE TESTS ---

try {
	// `get` based tests
	simpleGet();
	console.log(' >>> `simpleGet` test passed');
	getArray();
	console.log(' >>> `getArray` test passed');
} catch (expt) {
	console.log(expt);
	process.exit(1);
}
