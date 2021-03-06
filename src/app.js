import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss';
import store from './store/index.js';
import router from './router';


// load assets
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./assets/img/', true));

new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
    store: store
})
