/* eslint-disable no-useless-escape */
const webpack = require("webpack");
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

let configWebPack = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  configureWebpack: {
    optimization: {
      minimizer: []
    },
    resolve: {
      alias: {
        jquery: require.resolve("jquery"),
        config: "@/config.js",
        ApiClient: "@/api/ApiClient.js"
      }
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: "sass-loader",
              options: {}
            },
            {
              loader: "@epegzz/sass-vars-loader",
              options: {
                syntax: "scss",
                files: [path.resolve(__dirname, "src/colors.js")]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        "window.jQuery": "jquery",
        jquery: "jquery",
        "window.jquery": "jquery",
        $: "jquery",
        "window.$": "jquery",
        config: ["config", "default"],
        ApiClient: ["ApiClient", "default"],
        "window.ApiClient": ["ApiClient", "default"]
      })
    ]
  },
  productionSourceMap: false,
  devServer: {
    proxy: {
      "^/api": {
        target: "https://www.gih.one",
        //target: "http://www.9oxexchange.com",
        // target: "https://www.9oxexchange.com",
        // target: "https://demo.zsmart.tech",
        secure: false,
        ws: true,
        changeOrigin: true
      }
    },
    https: true,
    host: "0.0.0.0",
    port: 3000,
    hot: true,
    disableHostCheck: true
  }
};

if (process.env.NODE_ENV === "production") {
  configWebPack.configureWebpack.optimization.minimizer.push(
    new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: false,
      terserOptions: {}
    })
  );
  configWebPack.configureWebpack.module.rules.push({
    test: /\.js$/,
    include: [
      path.resolve(__dirname, "src/config.js"),
      path.resolve(__dirname, "src/api"),
      path.resolve(__dirname, "src/assets/js/canvas.js"),
      path.resolve(__dirname, "src/store")
    ],
    enforce: "post",
    use: {
      loader: "obfuscator-loader",
      options: {
        compact: true,
        controlFlowFlattening: false,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: false,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: false,
        domainLock: ["127.0.0.1", "localhost", "demo.zsmart.tech", "www.gih.one", "www.9oxexchange.com", "gih.one"],
        identifierNamesGenerator: "hexadecimal",
        identifiersPrefix: "",
        inputFileName: "",
        log: false,
        renameGlobals: false,
        reservedNames: [],
        reservedStrings: [],
        rotateStringArray: true,
        seed: 0,
        selfDefending: false,
        sourceMap: false,
        sourceMapBaseUrl: "",
        sourceMapFileName: "",
        sourceMapMode: "separate",
        stringArray: true,
        stringArrayEncoding: true,
        stringArrayThreshold: 1,
        target: "browser",
        transformObjectKeys: true,
        unicodeEscapeSequence: true
      }
    }
  });
  configWebPack.configureWebpack.plugins.push(
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CompressionPlugin()
  );
}

module.exports = configWebPack;
