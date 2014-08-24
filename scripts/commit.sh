#!/usr/bin/env bash

# Exit on failure of one of the follozing commands
set -e

make lint
make test
make doc
git add doc

exit 0
