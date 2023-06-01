const stream = require.resolve('stream-browserify');
const path = require.resolve('path-browserify');
const crypto = require.resolve('crypto-browserify');

module.exports = {
  resolve: {
    fallback: {
      stream,
      fs: false,
      path,
      crypto
    }
  }
};
