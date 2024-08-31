const path = require('path');

module.exports = {
  // Other Webpack configuration settings

  resolve: {
    fallback: {
      fs: false,
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      zlib: require.resolve('browserify-zlib'),
      child_process: false,
    },
  },
};
