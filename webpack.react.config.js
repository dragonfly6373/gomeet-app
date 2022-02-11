const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");
const webpack = require("webpack");

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ["main", "module", "browser"]
  },
  entry: "./src/windows/metting/index.jsx",
  target: "electron-renderer",
  node: {global: true, __dirname: true},
  devtool: "source-map",
  resolve: {
      roots: [path.join(__dirname, 'src')],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.sass', '.css']
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: process.env.NODE_ENV == 'production' ? '[hash:base64:5]' : '[hash:base64:5]-[local]'
                }
              }
          },
          {
              loader: "sass-loader",
              options: {
                  additionalData: "$env: " + process.env.NODE_ENV + ";"
              }
          }
        ]
      }, {
        test: /\.css$/i,
        use: [
          { loader: "style-loader" }, // options: { injectType: "linkTag" } },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[local]'
              }
            }
          }
        ]
      }, {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
        // test: /\.(woff(2)?|eot|ttf|otf)$/i,
        // use: [
        //   {
        //     loader: 'file-loader',
        //     options: {
        //       name: '[name].[ext]',
        //       outputPath: 'fonts/'
        //     }
        //   }
        // ]
      }, {
        test: /\.(wav|ogg|mp3|mp4|mov)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'medias/[name][ext]'
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dev")
    },
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 8080
  },
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugins(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      'global': {},
      'global.GENTLY': false
    }),
    new HtmlWebpackPlugin()
  ]
};
