const fs = require('fs-extra');

module.exports = (api, options) => {
    api.render('./template', { ...options, START_YEAR: new Date().getFullYear(), BASE_URL: '<%= BASE_URL %>', htmlWebpackPlugin:'<%= htmlWebpackPlugin.options.title %>' });
    api.extendPackage({
        dependencies: {
            'everflow': '^4.0.0-alpha.4'
        },
        devDependencies: {
            "everflow-webpack-plugin": "^0.1.0-alpha.1",
            "@everflow-cli/tools": "^0.1.2",
            "terser-webpack-plugin": "^3.0.0",
            "@types/crypto-js": "^3.1.45"
        }
    });
    api.extendPackage({ vue: { publicPath: api.makeJSOnlyValue("process.env.NODE_ENV === 'production' ? './' : './'" )} })

    api.onCreateComplete(() => {
        const filesToRemove = [
            './src/shims-tsx.d.ts',
            './src/shims-vue.d.ts',
        ];
        filesToRemove.forEach(function(file) {
            if (fs.existsSync(api.resolve(file)))
            {
                fs.unlinkSync(api.resolve(file))
            }
        });
    });

    if (api.hasPlugin('pwa'))
    {
        api.injectImports(api.entryFile, `import './registerServiceWorker';`);
    }
}