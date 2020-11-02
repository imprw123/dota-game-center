import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DOTA from '../views/dota.vue'
import PT from '../views/pt.vue'
import RPG from '../views/rpg.vue'
import IMBA from '../views/imba.vue'

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
    },
    {
        path: '/pt',
        name: 'PT',
        component: PT,
        meta: {
            cheakIsLogin: true
        }
    },
    {
        path: '/rpg',
        name: 'RPG',
        component: RPG,
        meta: {
            cheakIsLogin: true
        }
    },
    {
        path: '/imba',
        name: 'IMBA',
        component: IMBA,
        meta: {
            cheakIsLogin: true
        }
    }
]

const router = new VueRouter({
    routes
})

export default router