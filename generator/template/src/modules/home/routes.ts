import { RouteConfig } from 'vue-router'
import Home from './views/home.vue'

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: Home
    }
];
export default routes;
