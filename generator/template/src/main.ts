import { App, navigationGuards } from 'everflow'
import routes from './router';  // generated routes file router/index.ts
import everflowConfig from './evconfig.json';
import messages from './locales/evgen/en-US.json';  // combined en-US language file from all modules
import store from './store';  // generated vuex file store/index.ts


/****************************************************************************************************************************
    *** EVERFLOW APP ***
    Vue Router and Vuex are required plugins for Everflow
    Create an everflow application with config and routes
    -----------------------------------------------------
    app(everflowConfig, everflowOptions) 
        * everflowConfig: JSON - evconfig.json
        everflowOptions:
        {
            routes: Array<RouteConfig> - valid array of routes './router/routes.ts'
                - auto-generated each build with EverflowWebpackPlugin from vue.config.js
            routerOptions?: RouterOptions;
                - any custom vue router options
            vuePlugins?: Array<any>;
                - Plugins that require Vue.use(<plugin>)
            defaultLocaleMessages?: any;
                - required for i18n init, your default locale messages file
                - i18n folder name is mandatory convention
        }
    app.$router - is the Vue Router
    app.run(store, {Object})
        * store: Store<any> - valid vuex store ./store/index.js ('./store')
            - generated on each build with EverflowWebpackPlugin from modules
        * injects: Object<injectName: vuePlugin> - To use custom vue plugins
*****************************************************************************************************************************/
const app = new App(everflowConfig, {routes: routes, defaultLocaleMessages: messages});
/***************************************************************************************************************
Sample of built in NavigationGuard to change title of page on navigation
****************************************************************************************************************/
app.$router.beforeEach(navigationGuards.documentTitleNavGaurd);
/***************************************************************************************************************
This is all you need to do to use async to change locale of app
    - this.$app.language.locale('en-US');  |  From vue component
    - app.language.locale('en-US');        |  From here
****************************************************************************************************************/
app.run(store);