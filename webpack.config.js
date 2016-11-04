let path    = require("path");
let webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let WebPackAngularTranslate = require("webpack-angular-translate");

module.exports = {
  devtool: "sourcemap",
  entry: {},
  module: {
    preLoaders: [
      {
        test: /\.html$/,
        loader: WebPackAngularTranslate.htmlLoader()
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: [/app\/lib/, /node_modules/],
        loader: WebPackAngularTranslate.jsLoader("ng-annotate!babel")
      },
      { test: /\.html$/, loader: "raw" },
      { test: /\.styl$/, loader: "style!css!stylus" },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.(ttf|eot|svg|otf|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file?name=fonts/[name].[ext]" },
      { test: /\.json$/, loader: "json" }
    ]
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: "client/index.html",
      inject: "body",
      hash: true
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks (module) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, "client")) === -1;
      }
    }),

    new WebPackAngularTranslate.Plugin({
      fileName: "locale_defaults.json"
    })
  ]
};
