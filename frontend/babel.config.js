module.exports = function(api) {
  api.cache(false);
  const presets = [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ];
  const plugins = [
    "react-hot-loader/babel",
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
    ["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": true }, "antd"],
    [
      "import",
      {
        "libraryName": "lodash",
        "libraryDirectory": "",
        "camel2DashComponentName": false
      },
      "lodash"
    ]
    // 如果需要添加其他的 import 转换
    // ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib"}, "antd-mobile"]
  ];
  return {
    presets,
    plugins
  }
}
