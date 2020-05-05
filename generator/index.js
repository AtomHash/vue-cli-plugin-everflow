module.exports = (api, options) => {
  api.render('./template', { ...options, START_YEAR: new Date().getFullYear(), BASE_URL: 'BASE_URL', htmlWebpackPlugin:'htmlWebpackPlugin.options.title' });
  api.extendPackage({
    dependencies: {
      'everflow': '^4.0.0-alpha.2',
      "@everflow-cli/tools": "0.1.1"
    },
    scripts: {
      "preserve": "node ./node_modules/@everflow-cli/tools/magic-routes.js",
      "prebuild": "node ./node_modules/@everflow-cli/tools/magic-routes.js",
    }
  });
}