import { App, NavigationGuards } from 'everflow'
import routes from './router/routes';
import everflowConfig from './evconfig.json';
import store from './store';

/****************************************************************************************************************************
    *** EVERFLOW APP ***
    Vue Router and Vuex are required plugins for Everflow
    Create an everflow application with config and routes
    -----------------------------------------------------
    app(configfile, everflowRoutesFile, [VuePlugins]) 
        * configfile: JSON - evconfig.json
        * everflowRoutesFile: Array<RouteConfig> - valid array of routes './router/routes.ts'
            - auto-generated each build with EverflowWebpackPlugin in vue.config.js
        * [VuePlugins]: Array<PluginObject> - Plugins that need to init with Vue.use()
    app.$router - is the Vue Router
    app.run(store, [injects])
        * store: Store<any> - valid vuex store ./store/index.js ('./store')
            - generated on each build with EverflowWebpackPlugin from modules
        * [injects]: Array<~root option~> - To use custom vue plugins with new Vue ({store, [injects]})
*****************************************************************************************************************************/
const app = new App(everflowConfig, routes);
app.$router.beforeEach(NavigationGuards.documentTitleNavGaurd);
app.run(store);
