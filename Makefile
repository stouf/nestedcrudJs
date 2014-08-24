# Directories
NODE_MODULES_DIR = node_modules
JSDOC_DIR = doc
SCRIPTS_DIR = scripts
SRC_DIR = lib
TEST_DIR = test

# Executables
MOCHA_EXE = ./$(NODE_MODULES_DIR)/.bin/mocha
JSHINT_EXE = ./$(NODE_MODULES_DIR)/.bin/jshint
JSDOC_EXE = ./$(NODE_MODULES_DIR)/.bin/jsdoc

.PHONY: clean test install lint commit doc

help:
	@echo -e "\tmake test\t\twill launch the tests."
	@echo -e "\tmake install\t\twill install all the needed dependencies."

clean:
	rm -rf $(NODE_MODULES_DIR) $(JSDOC_DIR)

lint:
	git diff --staged --name-only --diff-filter=ACMR \
	| grep -E "(^($(SRC_DIR)|$(TEST_DIR))/.+(.js(on)*)$$)|(^index.js$$)" \
	| xargs $(JSHINT_EXE)

test:
	$(MOCHA_EXE) --check-leaks

doc:
	mkdir -p $(JSDOC_DIR)
	rm -rf $(JSDOC_DIR)/*
	$(JSDOC_EXE) -d $(JSDOC_DIR) lib/*.js

# Do not forget to add what you wanna commit to the staging area before running `make commit`
commit:
	$(SCRIPTS_DIR)/commit.sh

install:
	npm install
	$(SCRIPTS_DIR)/install_git-hook.sh
