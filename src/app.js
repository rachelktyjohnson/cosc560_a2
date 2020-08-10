import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss';

// load assets
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./assets/img/', true));

new Vue({
    el: '#app',
    render: h => h(App)
})
