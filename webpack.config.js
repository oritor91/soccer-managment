const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'http': 'http-browserify',
      'https': 'https-browserify',
      'stream': 'stream-browserify',
      'buffer': 'buffer',
    },
  },
  // Other webpack configurations...
};
