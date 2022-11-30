const merge = require('webpack-merge');
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const getConfig = require('./getConfig');
const constants = require('./constants');

const { app_name, assets_folder_name } = constants;
const DIST_PATH = resolve(__dirname, `../dist/${app_name}`);
const isProd = process.env.__ENV__ === 'PROD';

module.exports = async () => merge(await getConfig(), {
  mode: 'production',
  entry: ['./index.tsx'],
  output: {
    path: DIST_PATH,
    filename: `${assets_folder_name}/[name].[hash].js`,
    chunkFilename: `${assets_folder_name}/[name].[chunkHash].js`,
    publicPath: `/${app_name}/`,
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 5,
      automaticNameDelimiter: '-',
      cacheGroups: {
        '@ant-design': {
          name: '@ant-design',
          test: (module) => {
            return /@ant-design/.test(module.context);
          },
          chunks: 'initial',
          priority: 11,
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 5,
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          priority: 2,
          minChunks: 2,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          extractComments: 'all',
          compress: {
            drop_console: process.env.RELEASE_ENV === 'production' && true,
          },
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${assets_folder_name}/[name].[contentHash].css`,
      chunkFilename: `${assets_folder_name}/[name].[contentHash].css`,
    }),
    new HtmlWebpackPlugin({
      env: process.env.__ENV__,
      filename: '../index.html'
    }),
    // if you need 查看打包后体积
    // ,new BundleAnalyzerPlugin()
  ],
});
