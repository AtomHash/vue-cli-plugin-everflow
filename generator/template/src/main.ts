import { App, NavigationGuards } from 'everflow'
import routes from './router/routes';
import everflowConfig from './evconfig.json';
import store from './store';

/*****************************************************************************************
    *** EVERFLOW APP ***
    Vue Router and Vuex are required plugins for Everflow
    Create an everflow application with config and routes
    app.$router is the Vue Router
    app.run() requires a valid vuex store ./store/index.js
    app.run() injects is an object to use custom vue options new Vue ({state, injects})
*****************************************************************************************/
const app = new App(everflowConfig, routes);
app.$router.beforeEach(NavigationGuards.documentTitleNavGaurd);
app.run(store);
