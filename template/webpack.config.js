const path = require("path")

module.exports = {
  entry: "./src/index.js",
  resolve: {
    extensions: [".js", ".ts"]
  },
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: "app.js"
  },
  devServer: {
    static: "./public",
    host: "localhost"
  },
}