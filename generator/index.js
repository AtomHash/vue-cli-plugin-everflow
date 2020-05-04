module.exports = api => {
  api.extendPackage({
    dependencies: {
      'everflow': '^3.0.2',
      "@everflow-cli/tools": "0.1.0"
    },
    scripts: {
      "preserve": "node ./node_modules/@everflow-cli/tools/magic-routes.js",
      "prebuild": "node ./node_modules/@everflow-cli/tools/magic-routes.js",
    }
  });
  api.render('./template')
}