import Api from '@/services/Api'

//Clase que sirve para conectar con la parte de autenticación de usuarios del servidor
export default {
    //Se le envia usuario, email y contraseña
    registrar(credenciales){
        return Api().post('usuarios',credenciales)
    },
    //Se le envia usuario y contraseña
    login(credenciales){
        return Api().post('login',credenciales)
    }
}