module.exports = (api, options) => {
  api.render('./template', { ...options, START_YEAR: new Date().getFullYear(), BASE_URL: '<%= BASE_URL %>', htmlWebpackPlugin:'<%= htmlWebpackPlugin.options.title %>' });
  api.extendPackage({
    dependencies: {
      'everflow': '^4.0.0-alpha.3'
    },
    devDependencies: {
      "@everflow-cli/tools": "^0.1.1",
      "terser-webpack-plugin": "^3.0.0"
    },
    scripts: {
      "preserve": "node ./node_modules/@everflow-cli/tools/magic-routes.js",
      "prebuild": "node ./node_modules/@everflow-cli/tools/magic-routes.js"
    }
  });
  if (api.hasPlugin('pwa'))
  {
    api.injectImports(api.entryFile, `import './registerServiceWorker';`);
  }
}