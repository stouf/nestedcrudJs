help:
	@echo -e "\tmake test\t\twill launch the tests."
	@echo -e "\tmake install\t\twill install all the needed dependencies."

test:
	node ./test.js

install:
	npm install
