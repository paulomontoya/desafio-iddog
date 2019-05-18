// production config
const merge = require('webpack-merge');
const {
  resolve
} = require('path');

const commonConfig = require('./common');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './index.tsx',
  devtool: 'source-map',
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/',
  },
  plugins: [],
});