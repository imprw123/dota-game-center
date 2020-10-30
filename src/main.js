import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import request from './api/api.js';
import ports from './api/port.js'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
    loading: require("./assets/default.jpg")

})
Vue.config.productionTip = false
Vue.prototype.$axios = request;
Vue.prototype.$ports = ports;
var _that = this;
router.beforeEach((to, from, next) => {
    // debugger
    if (to.meta.cheakIsLogin) {
        if (window.localStorage.getItem('loginInfo')) {
            next();
        } else {
            axios.get('Login/GetNowUser')
                .then(function(response) {
                    if (response.data.code < 0) {
                        //window.location.href = `http://test.shop.5211game.com/Login?returnUrl=${escape(window.location.href)}`;
                        next();
                    } else {
                        window.localStorage.setItem('loginInfo', response.data.data);
                        next();
                    }
                })
                .catch(function(error) {
                    console.log(error);
                })

        }
    } else {
        next();
    }
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')