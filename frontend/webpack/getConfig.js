const { resolve, join } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");
const webpack = require("webpack");

const constants = require("./constants");

module.exports = async function (debug = false) {
  let plugins = [
    new webpack.NamedModulesPlugin(),
    new DefinePlugin({
      "process.env.__ENV__": JSON.stringify(process.env.__ENV__),
      "process.env.RELEASE_ENV": JSON.stringify(process.env.RELEASE_ENV),
    }),
  ];

  return {
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        "react-dom": debug ? "@hot-loader/react-dom" : "react-dom",
        "@": join(__dirname, "../src"),
      },
    },
    context: resolve(__dirname, "../src"),
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          include: [
            process.env.__ENV__ !== "DEV"
              ? resolve(__dirname, "../node_modules")
              : false,
            resolve(__dirname, "../src"),
          ].filter(Boolean),
          loader: "babel-loader",
        },
        {
          test: /\.css$/,
          use: [
            debug ? "style-loader" : MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { importLoaders: 1 } },
            "postcss-loader",
          ],
        },
        {
          test: /\.scss$/,
          exclude: /\.module\.(scss|sass)$/,
          loaders: [
            debug ? "style-loader" : MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { importLoaders: 2 } },
            "postcss-loader",
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              },
            },
          ],
        },
        {
          test: /\.module\.(scss|sass)$/,
          loaders: [
            debug ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                modules: true,
                localIdentName: "[name]__[local]-[hash:base64:5]",
              },
            },
            "postcss-loader",
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              },
            },
          ],
        },
        {
          test: /\.less$/,
          loaders: [
            debug ? "style-loader" : MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { importLoaders: 2 } },
            "postcss-loader",
            { loader: "less-loader", options: { javascriptEnabled: true } },
          ],
        },
        {
          test: /\.svg$/,
          exclude: [resolve(__dirname, "../node_modules")],
          use: [
            "@svgr/webpack",
            {
              loader: "url-loader",
              options: {
                limit: 8192,
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 10000,
                name: `${constants.assets_folder_name}/images/[hash].[ext]`,
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|woff|otf|woff2|mp3)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                limit: 10000,
                name: `${constants.assets_folder_name}/fonts/[hash].[ext]`,
              },
            },
          ],
        },
      ],
    },
    plugins,
    performance: {
      hints: false,
    },
  };
};
