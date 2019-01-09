import Vue from 'vue'
import VueRouter from 'vue-router'
import Registrar from '@/components/Registrar'
import Login from '@/components/Login'
import Peliculas from '@/components/Peliculas'

Vue.use(VueRouter)

export default new VueRouter({

    routes:[{
        path:'/registrar',
        name:'registrar',
        component: Registrar
    },
    {
        path:'/login',
        name:'login',
        component: Login
    },
    {
        path:'/peliculas',
        name:'peliculas',
        component: Peliculas
    }]
})