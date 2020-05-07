module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './'
}

/*************************************
Might be useful :)

----- TerserPlugin Compression -----
const TerserPlugin = require('terser-webpack-plugin');

configureWebpack: {
    optimization: {
        minimize: process.env.NODE_ENV === 'production' ? true : false,
        minimizer: [new TerserPlugin()],
    }
}

----- GZIP support -----
npm install compression-webpack-plugin --save-dev
const CompressionPlugin = require('compression-webpack-plugin');

configureWebpack: {
    plugins: [new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
        })]
}
**************************************/