// sample root route file
import { RouteConfig } from 'vue-router';
import Home from '../modules/home/pages/home/index.vue';

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home-home',
        component: Home,
        meta: {
            title: 'Home'
        }
    }
];
export default routes;
