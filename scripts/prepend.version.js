'use strict';

let prependFile = require('prepend-file');
let filename = './dist/lr360.js';
let version = require('../package.json').version;
let build = process.env.BUILD_NUMBER || '';  // process.argv[2] || '';

let data = `/* version ${version}-${build} */`;

prependFile(filename, data, (err) => {
  if (err) {
    if (err.message) {
      console.error(err.message);
      process.exit(1);
    } else {
      throw err;
    }
  }
});