const path = require("path");
const merge = require("webpack-merge");

const parts = require("./webpack.parts");

const PATHS = {
  app: [path.resolve(__dirname, "src")],
  modules: [path.resolve(__dirname, "node_modules")]
};

const commonConfig = merge([
  {
    entry: "./src/index.js",
    output: {
      path: __dirname + "/public",
      filename: "bundle.[hash].js"
    }
  },
  parts.loadJavaScript({ include: PATHS.app }),
  parts.indexHtmlTemplate()
]);

const productionConfig = merge([
  parts.cleanOutputDirectory(),
  parts.extractCSS({
    include: PATHS.app,
    use: "css-loader"
  })
]);

const developmentConfig = merge([
  parts.loadCSS({ include: PATHS.app }),
  {
    serve: {
      port: 9090,
      logLevel: ["warn", "error"]
    }
  }
]);

module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
