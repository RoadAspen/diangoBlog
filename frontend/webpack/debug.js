const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, join } = require('path');
const getConfig = require('./getConfig');
const constants = require('./constants');

const port = process.env.PORT || constants.port;

module.exports = async () => merge(await getConfig(true), {
  mode: 'development',
  entry: [ '../src/index.tsx' ],
  output: {
    path: resolve(__dirname, '../tmp'),
    filename: `${constants.assets_folder_name}/[name].js`,
    chunkFilename: `${constants.assets_folder_name}/[name].js`,
    publicPath: '/'
  },
  devServer: {
    hot: true,
    https: false,
    host: '0.0.0.0',
    port,
    overlay: true,
    compress: true,
    historyApiFallback: true,
    disableHostCheck: true,
    hotOnly: true
  },
  devtool: '#source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new HtmlWebpackPlugin({
      template: join(__dirname, '../src/index.html'),
      __ENV__: process.env.__ENV__,
    }),
  ]
});
