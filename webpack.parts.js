const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

exports.indexHtmlTemplate = () => {
  const plugin = new HtmlWebpackPlugin({
    title: "React App",
    template: "src/index.html"
  });

  return {
    plugins: [plugin]
  };
};

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
});

exports.extractCSS = ({ include, exclude, use }) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    // `allChunks` is needed to extract from extracted chunks as well.
    allChunks: true,
    filename: "[name].[hash].css"
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          use: plugin.extract({
            use,
            fallback: "style-loader"
          })
        }
      ]
    },
    plugins: [plugin]
  };
};

exports.cleanOutputDirectory = () => {
  const plugin = new CleanWebpackPlugin(["public"], {
    dry: false
  });

  return {
    plugins: [plugin]
  };
};

exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()]
  }
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        use: "babel-loader"
      }
    ]
  }
});
