import { RouteConfig } from 'vue-router'
import ConfirmLeaveNavGuard from './nav-guards/confirm-leave.navguard'
import Home from './pages/home.vue'
import About from './pages/about.vue'

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
        component: About,
        beforeEnter: ConfirmLeaveNavGuard,
        meta: {
            title: 'About'
        }
    }
];
export default routes;
