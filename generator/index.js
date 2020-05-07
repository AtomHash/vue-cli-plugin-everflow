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
    api.extendPackage({ vue: {
        publicPath: api.makeJSOnlyValue("process.env.NODE_ENV === 'production' ? './' : './'" ),
        configureWebpack: {
            plugins: api.makeJSOnlyValue('[new EverflowWebpackPlugin]')
        }}});

    // Fix first time compliation run fix error
    const vueConfig = api.resolve('./vue.config.js');
    const evRequire = "const EverflowWebpackPlugin = require('everflow-webpack-plugin');";
    const evImport = "import EverflowWebpackPlugin from 'everflow-webpack-plugin';";
    const reEvImport = /import EverflowWebpackPlugin from 'everflow-webpack-plugin';/g;
    if (fs.existsSync(vueConfig))
    {
        const contents = fs.readFileSync(vueConfig).toString('utf8');
        fs.writeFileSync(vueConfig, contents.replace(evRequire, ''));
    }
    api.injectImports('vue.config.js', evImport);

    // api.afterInvoke(() => {})
    api.onCreateComplete(() => {

        // If PWA plugin is installed, inject service worker to main.ts
        if (api.hasPlugin('pwa'))
        {
            api.injectImports(api.entryFile, `import './registerServiceWorker';`);
        }

        // Inject EverflowWebpackPlugin require to vue.config.js
        // Workout around for ESLINT triggering 'use import instead' error
        if (fs.existsSync(vueConfig))
        {
            fs.readFile(vueConfig, 'utf8', function (err,data)
            {
                if (err) return console.log(err);
                const result = data.replace(evImport, evRequire);
                fs.writeFile(vueConfig, data.replace(reEvImport, evRequire), 'utf8', function (err) {
                    if (err) return console.log(err) 
                });
            });
        }

        // Remove problematic d.ts files from sample project
        const filesToRemove = [
            './src/shims-tsx.d.ts',
            './src/shims-vue.d.ts'];
        filesToRemove.forEach(function(file)
        {
            if (fs.existsSync(api.resolve(file)))
            {
                fs.unlinkSync(api.resolve(file))
            }
        });

        // Remove orphanded files if the user agrees
        const orphandedFiles = [
            './src/App.vue',
            './src/views/About.vue',
            './src/views/Home.vue',
            './src/router/index.ts',
            './src/components/HelloWorld.vue'];
        if (options.IS_DESTROYABLE)
        {
            orphandedFiles.forEach(function(file) {
                if (fs.existsSync(api.resolve(file)))
                {
                    fs.unlinkSync(api.resolve(file))
                }
            });
        }
    });
}