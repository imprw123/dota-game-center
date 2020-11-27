import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import $ from 'jquery'
import request from './api/api.js';
import ports from './api/port.js'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
    loading: require("./assets/default.jpg"),
    error: 'https://img.5211game.com/5211/shop/RPG/85.jpg'

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
                        window.location.href = `http://test.shop.5211game.com/Login?returnUrl=${escape(window.location.href)}`;
                        //next();
                    } else {
                        window.localStorage.setItem('loginInfo', `${response.data.data.UserId}|${response.data.data.Token}`);
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

Vue.filter('myDateFilter', function(timestamp) {
    var date = new Date(
        parseInt(timestamp.replace("/Date(", "").replace(")/", ""), 10)
    );
    var Y = date.getFullYear() + "-";
    var M =
        (date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1) :
            date.getMonth() + 1) + "";
    var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
    var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + '-' + D + h + s

})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')