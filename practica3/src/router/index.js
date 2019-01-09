import Vue from 'vue'
import VueRouter from 'vue-router'
import Registrar from '@/components/Registrar'

Vue.use(VueRouter)

export default new VueRouter({

    routes:[{
        path:'/usuarios',
        name:'registrar',
        component: Registrar
    }]
})