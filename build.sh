#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build
npm run typeOrm migration:run -d dist/src/data-source