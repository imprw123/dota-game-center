import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import request from './api/api.js';
import ports from './api/port.js'
Vue.config.productionTip = false
Vue.prototype.$axios = request;
Vue.prototype.$ports = ports;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')