const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const { BASE_URL } = process.env;

const exposedEnv = {
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.API_URL,
  BASE_URL: BASE_URL || ""
};

const envNames = (process.env.EXPOSED_ENV_VARS || "")
  .split(/,/g)
  .filter(Boolean);

for (const envName of envNames) {
  const value = process.env[envName];

  if (value) {
    exposedEnv[envName] = value;
  }
}

module.exports = ({ name, entry, mode, outputPath, modulesFile }) => {
  return {
    entry,
    mode,
    devtool: "cheap-source-map",
    devServer: {
      publicPath: BASE_URL || "/",
      contentBase: outputPath,
      compress: true,
      port: process.env.PORT,
      disableHostCheck: true,
      historyApiFallback: {
        index: BASE_URL || "/"
      }
    },
    output: {
      path: outputPath,
      chunkFilename: "[name].bundle.js",
      filename: "index_bundle.js",
      publicPath: BASE_URL ? `${BASE_URL}/` : "/"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!@internal\/).*/,
          use: {
            loader: require.resolve("babel-loader"),
            options: require("./babel.config")
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"].map(require.resolve)
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"].map(
            require.resolve
          )
        },
        {
          test: /\.svg$/,
          use: {
            loader: require.resolve("svg-react-loader"),
            options: {
              filters: [require("./svgCleanUpFilter")]
            }
          }
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: require.resolve("file-loader"),
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/"
              }
            }
          ]
        },
        {
          test: /\.graphql$/,
          use: ["raw-loader"].map(require.resolve)
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: name,
        meta: {
          viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
        }
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(exposedEnv)
      }),
      modulesFile
        ? new webpack.NormalModuleReplacementPlugin(
            /node_modules\/@internal\/backoffice-base\/src\/modules\.js$/,
            modulesFile
          )
        : null
    ].filter(Boolean)
  };
};
