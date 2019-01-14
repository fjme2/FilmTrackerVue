import Vue from 'vue'
import VueRouter from 'vue-router'
import Registrar from '@/components/Registrar'
import Login from '@/components/Login'
import Peliculas from '@/components/Peliculas'
import CrearPelicula from '@/components/CrearPelicula'
import DetallesPelicula from '@/components/DetallesPelicula'
import store from '@/store/store'

Vue.use(VueRouter)

//En esta clase se usa vue-router para crear las rutas de la aplicación
const router =  new VueRouter({
    routes:[
        {
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
        },
        {
          path: '*',
          redirect: 'peliculas'
    }
    ]   
});

const openRoutes=['login','registrar'];
router.beforeEach((to, from, next) => {
    //Evita que un usuario no logeado entre en una pagina que requiere autenticacion y viceversa
    //Las unicas que no necesitan autenticacion son login y registrar
    if(store.getters.logeado){
        if(openRoutes.includes(to.name)){
            next('/peliculas')
        }else{
            next()
        }
    }else{
        if(openRoutes.includes(to.name)){
            next()
        }else{
            next('/login')
        }
    }

})

export default router