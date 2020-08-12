import Vue from 'vue';
import Router from 'vue-router';
import Landing from '../views/Landing.vue';
import Account from '../views/Account.vue';
import Listing from '../views/Listing.vue';

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'landing',
        component: Landing
    },
    {
        path: '/account',
        name: 'account',
        component: Account
    },
    {
        path: '/listing',
        name: 'listing',
        component: Listing
    }
]

const router = new Router({
    routes,
    linkExactActiveClass: "active"
})

export default router
