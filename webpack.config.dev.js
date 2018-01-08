const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  devServer: {
    contentBase: ["./", "./presentations/", "./examples/"],
    watchContentBase: true,
    host: '0.0.0.0'
  }
});
