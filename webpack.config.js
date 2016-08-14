var path = require('path')
var webpack = require('webpack')
var NpmInstallPlugin = require('npm-install-webpack-plugin')
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new NpmInstallPlugin()
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [
          path.resolve(__dirname, 'src'),
        ],
      }
    ],
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
        loaders: ['react-hot', 'babel-loader'],
        include: [
          path.resolve(__dirname, 'src'),
        ],
        test: /\.js$/,
        plugins: ['transform-runtime'],
      },
    ]
  },
  postcss: function () {
    return [autoprefixer, precss];
  }
}
