import { RouteConfig } from 'vue-router'
import ConfirmLeaveNavGuard from './nav-guards/confirm-leave.navguard'
import Home from './pages/home.vue'
const Login = () => import(/* webpackChunkName: "home-login" */'./pages/login.vue').then(m => m.default) //async example

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'loign',
        component: Login,
        beforeEnter: ConfirmLeaveNavGuard
    }
];
export default routes;
