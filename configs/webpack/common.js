// shared config (dev and prod)
const {
  resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function srcPath(subdir) {
  return resolve(__dirname, "../../src", subdir);
}

module.exports = {
  context: resolve(__dirname, '../../src'),
  module: {
    rules: [{
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: 'index.html.ejs',
  //   }),
  // ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      "@prakriti": srcPath("prakriti"),
      "@purusha": srcPath("purusha"),
    },
  },
  performance: {
    hints: false,
  },
};