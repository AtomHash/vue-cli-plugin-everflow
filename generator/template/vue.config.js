// const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './'
  /*
    configureWebpack: {
      optimization: {
        minimize: process.env.NODE_ENV === 'production' ? true : false,
        minimizer: [new TerserPlugin()],
  }
  }
  */
  /* GZIP support
      plugins: [new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
        })],
  */
}