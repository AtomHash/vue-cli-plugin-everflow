import { App, navigationGuards } from 'everflow'
import routes from './router/routes';
import everflowConfig from './evconfig.json';
import messages from './i18n/en.json'
import store from './store';


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
            defaultI18nMessages?: any;
                - required for i18n init, your defaultly loaded locale file 
                - i18n folder name is mandatory convention
        }
    app.$router - is the Vue Router
    app.run(store, {Object})
        * store: Store<any> - valid vuex store ./store/index.js ('./store')
            - generated on each build with EverflowWebpackPlugin from modules
        * injects: Object<injectName: vuePlugin> - To use custom vue plugins
*****************************************************************************************************************************/
const app = new App(everflowConfig, {routes: routes, defaultI18nMessages: messages});
/***************************************************************************************************************
Sample of built in NavigationGuard to change title of page on navigation
****************************************************************************************************************/
app.$router.beforeEach(navigationGuards.documentTitleNavGaurd);
/***************************************************************************************************************
This is all you need to do to use async to change locale of app
    - this.$app.language.locale('fr');  |  From vue component
    - app.language.locale('fr');        |  From here
****************************************************************************************************************/
app.run(store);