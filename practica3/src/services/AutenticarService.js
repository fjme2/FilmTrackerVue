import Api from '@/services/Api'

export default {
    registrar(credenciales){
        return Api().post('usuarios',credenciales)
    },

    login(credenciales){
        return Api().post('login',credenciales)
    }
}