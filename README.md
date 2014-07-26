# nestedcrud

The goal of this small lib is to let developers being able to get access to object's properties like the following:

```javascript
var nestedcrud = require('nestedcrud');

var object = {
		name: 'stouf',
		companies: {
			main: {
				name: 'Wizcorp',
				location: 'Japan'
			}
		}
	};

nestedcrud.get(object, 'companies.main.name');  // "Wizcorp"
```

The basic CRUD operations (`get`, `set` `delete`) will be implemented.




## How to install ?

### NPM

Run `npm install nestedcrud` and you're ready to go !




## API


### `get(object, path)`

- *object* is your targeted object.
- *path* is the accessor (i.e `subObject1.subObject2.property`)
