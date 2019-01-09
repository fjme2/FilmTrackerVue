import Api from '@/services/Api'

export default {
    registrar(credenciales){
        return Api().post('usuarios',credenciales)
    }
}