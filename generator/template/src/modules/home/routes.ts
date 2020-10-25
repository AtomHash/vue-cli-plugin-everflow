import { RouteConfig } from 'vue-router'
import ConfirmLeaveNavGuard from './nav-guards/confirm-leave.navguard'
import Home from './pages/home.vue'

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home-home',
        component: Home,
        meta: {
            title: 'Home'
        }
    },
    {
        path: '/about',
        name: 'home-about',
        component: () => import(/* webpackChunkName: "about" */ './pages/about.vue'),
        beforeEnter: ConfirmLeaveNavGuard,
        meta: {
            title: 'About'
        }
    }
];
export default routes;
