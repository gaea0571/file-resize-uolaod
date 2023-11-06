const path = require("path");
const { merge } = require("webpack-merge");

const basic_client_config = require("../client/webpack.client.basic");

module.exports = merge(basic_client_config, {
  mode: "production",
  output: {
    clean: true,
    path: path.resolve(process.cwd(), "./dist/application/"),
    filename: "application.[hash].js",
  }
});