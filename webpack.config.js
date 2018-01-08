var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/bodlanes2'
  ],
  output: {
      publicPath: '/',
      filename: 'bodlanes2.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { 
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      },
      { 
        test: /\.less$/,
        loader: "style!css!autoprefixer!less"
      },
    ]
  },
  devServer: {
    contentBase: ["./", "./presentations/", "./examples/"],
    watchContentBase: true,
    host: '0.0.0.0'
  }
};
