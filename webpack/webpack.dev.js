const path = require('path');
module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    compress: true,
    port: 8080,
    open: {
      app: {
        name: 'Yandex'
      }
    },
    hot: true,
  },
}