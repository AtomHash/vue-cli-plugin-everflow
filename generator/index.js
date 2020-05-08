const fs = require('fs-extra');

module.exports = (api, options) => {

    // Define package.json dependencies for this version
    api.extendPackage({
        dependencies: {
            'everflow': '^4.0.0-alpha.5'
        },
        devDependencies: {
            "everflow-webpack-plugin": "^0.1.0-alpha.1",
            "@everflow-cli/tools": "^0.1.2",
            "terser-webpack-plugin": "^3.0.0",
            "@types/crypto-js": "^3.1.45"
        }
    });

    // Modify options if needed
    options.API_URL = options.API_URL.replace(/\/$/, '');

    // function to generate a 64bit key for AES256BIT encrypt function
    const generateAESKey = function()
    {
        let hex = '0123456789abcdef';
        let key = '';
        for (i = 0; i < 64; i++)
        {
            key += hex.charAt(Math.floor(Math.random() * 16));
        }
        return key;
    }

    // Dynamic Imports
    const vueConfigJsPath = api.resolve('./vue.config.js');
    const prepareWebpackPlugins = function(plugins)
    {
        if (!fs.existsSync(vueConfigJsPath))
        {
            fs.writeFileSync(vueConfigJsPath, '', { flag: 'wx' });
        }
        if (fs.existsSync(vueConfigJsPath))
        {
            var contents = fs.readFileSync(vueConfigJsPath).toString('utf8');
            if(plugins)
            {
                plugins.forEach(function(plugin)
                {
                    var thisImport = `import ${plugin.name} from '${plugin.package}';`;
                    var thisRequire = `const ${plugin.name} = require('${plugin.package}');`;
                    contents = contents.replace(thisImport, '');
                    contents = contents.replace(thisRequire, '');
                    // get past eslint - no var require...
                    api.injectImports('vue.config.js', thisImport);
                });
            }
            fs.writeFileSync(vueConfigJsPath, contents);
        }
    }

    const finalizeWebpackPlugins = function(plugins)
    {
        fs.readFile(vueConfigJsPath, 'utf8', function (err,contents)
        {
            if (err) return console.log(err);
            if(plugins)
            {
                plugins.forEach(function(plugin){
                    var thisImport = `import ${plugin.name} from '${plugin.package}';`;
                    var thisRequire = `const ${plugin.name} = require('${plugin.package}');`;
                    contents = contents.replace(thisImport, thisRequire);
                //data.replace(reThisImport, thisRequire)
            });
            }
            fs.writeFile(vueConfigJsPath, contents, 'utf8', function (err) {
                if (err) return console.log(err) 
            });
        });
    }
    api.render('./template', { ...options, AES_KEY: generateAESKey(), START_YEAR: new Date().getFullYear(), BASE_URL: '<%= BASE_URL %>', htmlWebpackPlugin:'<%= htmlWebpackPlugin.options.title %>' });

    prepareWebpackPlugins([{
        name: 'EverflowWebpackPlugin',
        package: 'everflow-webpack-plugin'
    },
    {
        name: 'webpack',
        package: 'webpack'
    }])

    api.extendPackage({ vue: {
        publicPath: api.makeJSOnlyValue("process.env.NODE_ENV === 'production' ? './' : './'" ),
        configureWebpack: {
            plugins: api.makeJSOnlyValue('[new EverflowWebpackPlugin, new webpack.ContextReplacementPlugin(/moment[/\\\\]locale$/, /en|fr/)]'),
            resolve: {
                alias: {
                    'vue$': 'vue/dist/vue.esm.js'
                  }
              }
        }}});

    // Fix first time compliation run fix error
    // const vueConfig = api.resolve('./vue.config.js');
    // const evRequire = "const EverflowWebpackPlugin = require('everflow-webpack-plugin');";
    // const evImport = "import EverflowWebpackPlugin from 'everflow-webpack-plugin';";
    // const reEvImport = /import EverflowWebpackPlugin from 'everflow-webpack-plugin';/g;
    // if (fs.existsSync(vueConfig))
    // {
    //     const contents = fs.readFileSync(vueConfig).toString('utf8');
    //     fs.writeFileSync(vueConfig, contents.replace(evRequire, ''));
    // }
    // api.injectImports('vue.config.js', evImport);

    // api.afterInvoke(() => {})
    api.onCreateComplete(() => {

        //Edit TSCONFIG - Fix JSON imports
        let tsConfig = '';
        let tsConfigPath = api.resolve('./tsconfig.json');
        if (fs.existsSync(tsConfigPath))
        {
            tsConfig = fs.readJsonSync(tsConfigPath, { encoding: 'utf8' });
            tsConfig.compilerOptions['resolveJsonModule'] = true;
            fs.writeJsonSync(tsConfigPath, tsConfig, {
                spaces: 2,
                encoding: 'utf8'
            });
        }

        // If PWA plugin is installed, inject service worker to main.ts
        if (api.hasPlugin('pwa'))
        {
            api.injectImports(api.entryFile, `import './registerServiceWorker';`);
        }

        // Inject EverflowWebpackPlugin require to vue.config.js
        // Workout around for ESLINT triggering 'use import instead' error

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

        // Convert imports to requires ASYNC to pass eslint...
        finalizeWebpackPlugins([{
            name: 'EverflowWebpackPlugin',
            package: 'everflow-webpack-plugin'
        },
        {
            name: 'webpack',
            package: 'webpack'
        }])

        
    });

}