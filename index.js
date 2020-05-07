// eslint-disable-next-line no-unused-vars
const EverflowWebpackPlugin = require('everflow-webpack-plugin');

module.exports = (api, options) => {

    // Add everflow plugin to webpack config for VueJS
    // api.configureWebpack((config) => {
    //      return { plugins: [new EverflowWebpackPlugin]}
    // });
    api.chainWebpack((config) => {
        config
          .plugin('everflowWebpackPlugin')
              .use(EverflowWebpackPlugin)
                  // .before('webpack-dev-server') or HotModuleReplacementPlugin  devServer
                  .end();
    });
};