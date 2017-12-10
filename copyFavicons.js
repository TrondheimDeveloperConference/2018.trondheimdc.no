#!/usr/bin/env node

const copy = require('copy');

const errorHandler = (err, files) => {
    if (err) throw err;
    // `files` is an array of the files that were copied
};
copy('src/favicon/*', 'dist/favicon', errorHandler);