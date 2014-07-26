# nestedcrud

*(Work in progress !!)*

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


### Install with [component(1)](http://component.io):

```bash
$ component install stouf/nestedcrudJs
```







## API


### `get(object, path)`

- *object* is your targeted object.
- *path* is the accessor (i.e `subObject1.subObject2.property`)





## License

	The MIT License (MIT)

	Copyright (c) 2014 <copyright holders>

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
