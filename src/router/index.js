import Vue from 'vue';
import Router from 'vue-router';
import Landing from '../views/Landing.vue';
import Account from '../views/Account.vue';
import Listing from '../views/Listing.vue';
import Restaurant from "../views/Restaurant.vue";
import Checkout from "../views/Checkout.vue";

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
    },
    {
        path: '/restaurant',
        name: 'restaurant',
        component: Restaurant
    },
    {
        path:'/checkout',
        name: 'checkout',
        component: Checkout
    }
]

const router = new Router({
    routes,
    linkExactActiveClass: "active"
})

export default router
