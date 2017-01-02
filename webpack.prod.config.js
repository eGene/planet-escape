var path = require('path')
var webpack = require('webpack')
var NpmInstallPlugin = require('npm-install-webpack-plugin')
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new NpmInstallPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!postcss!less'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        loaders: ['babel-loader'],
        include: [
          path.resolve(__dirname, 'src'),
        ],
        test: /\.js$/
      },
    ]
  },
  postcss: function () {
    return [autoprefixer, precss];
  }
}
