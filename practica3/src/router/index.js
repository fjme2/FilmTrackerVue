import Vue from 'vue'
import VueRouter from 'vue-router'
import Registrar from '@/components/Registrar'
import Login from '@/components/Login'
import Peliculas from '@/components/Peliculas'
import CrearPelicula from '@/components/CrearPelicula'
import DetallesPelicula from '@/components/DetallesPelicula'

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
    },
    {
        path:'/peliculas/crear',
        name:'crear-pelicula',
        component: CrearPelicula
    },
    {
        path:'/peliculas/:peliId',
        name:'peli',
        component: DetallesPelicula
    }]
})