import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

//Clase para gestionar el estado de aplicación de forma centralizada
export default new Vuex.Store({
    strict: true,
    plugins: [
        createPersistedState()
    ],
    state:{
        //Token de un usuario
        token: null,
        //Si el usuario está logeado
        isLogged: false
    },
    mutations:{
        //Si existe token significa que el usuario está logeado
        setToken(state,token){
            state.token = token
            if(token){
                state.isLogged = true
            }else{
                state.isLogged = false
            }
        }

    },
    actions:{
        setToken({commit},token){
            commit('setToken',token)
        }
        
    },getters :{
        logeado: state => state.isLogged
    }

})