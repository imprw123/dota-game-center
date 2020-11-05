import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DOTA from '../views/dota.vue'
import PT from '../views/pt.vue'
import RPG from '../views/rpg.vue'
import IMBA from '../views/imba.vue'
import DETAIL from '../views/detail.vue'
import RPGMAP from '../views/rpgMap.vue'
import ORDER from '../views/order.vue'
import MYMAP from '../views/myMap.vue'
import SHOPCAR from '../views/shopCar.vue'
import SEARCH from '../views/search.vue'

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
    },
    {
        path: '/detail',
        name: 'DETAIL',
        component: DETAIL,
        meta: {
            cheakIsLogin: true
        }
    },
    {
        path: '/rpgMap',
        name: 'RPGMAP',
        component: RPGMAP,
        meta: {
            cheakIsLogin: true
        }
    },
    {
        path: '/order',
        name: 'ORDER',
        component: ORDER,
        meta: {
            cheakIsLogin: true
        }
    },
    {
        path: '/myMap',
        name: 'MYMAP',
        component: MYMAP,
        meta: {
            cheakIsLogin: true
        }
    },
    {
        path: '/shopCar',
        name: 'SHOPCAR',
        component: SHOPCAR,
        meta: {
            cheakIsLogin: true
        }
    },
    {
        path: '/search',
        name: 'SEARCH',
        component: SEARCH,
        meta: {
            cheakIsLogin: true
        }
    }

]

const router = new VueRouter({
    routes
})

export default router