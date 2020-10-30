import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DOTA from '../views/dota.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            cheakIsLogin: true
        }
    },
    {
        path: '/dota',
        name: 'DOTA',
        component: DOTA,
        meta: {
            cheakIsLogin: true
        }
    }
]

const router = new VueRouter({
    routes
})

export default router