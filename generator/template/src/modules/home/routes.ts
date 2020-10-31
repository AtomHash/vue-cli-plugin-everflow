import { RouteConfig } from 'vue-router';
import ConfirmEnterNavGuard from './navigation/confirm-enter.navguard';

const routes: Array<RouteConfig> = [
    // home route is located in ./src/router/routes.ts
    {
        path: '/about',
        name: 'home-about',
        component: () => import(/* webpackChunkName: "about" */ './pages/about/index.vue'),
        beforeEnter: ConfirmEnterNavGuard,
        meta: {
            title: 'About'
        }
    }
];
export default routes;
