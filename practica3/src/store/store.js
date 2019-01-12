import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [
        createPersistedState()
    ],
    state:{
        token: null,
        isLogged: false
    },
    mutations:{
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
        
    }

})