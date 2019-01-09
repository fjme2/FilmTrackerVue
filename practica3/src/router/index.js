import Vue from 'vue'
import VueRouter from 'vue-router'
import Registrar from '@/components/Registrar'
import Login from '@/components/Login'

Vue.use(VueRouter)

export default new VueRouter({

    routes:[{
        path:'/usuarios',
        name:'registrar',
        component: Registrar
    },
    {
        path:'/login',
        name:'login',
        component: Login
    }]
})