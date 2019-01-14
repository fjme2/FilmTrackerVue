import Api from '@/services/Api'

//Clase que sirve para conectar con la parte de peliculas del servidor
//En todas las funciones se envia la cabecera de Authorization y el token de usuario
export default {
    //Petición de información de todas las peliculas
    allPeliculas(token){
        return Api().get('pelicula',{headers: {
            'Authorization': btoa(token)}})
    },
    //Creación de una pelicula
    crearPelicula(peli, token){
        //Se pasa por parametro el objeto peli que lleva el id, titulo, fecha y overview de la pelicula
        return Api().post('pelicula',peli,{headers: {
            'Authorization': btoa(token)}})
    },
    //Información de la pelicula con el id que contiene ka variable peliId
    mostrar(peliId, token){
        return Api().get(`pelicula/${peliId}`,{headers: {
            'Authorization': btoa(token)}})
    },
    //Borrado de una pelicula
    borrar(peli, token){
        return Api().delete('pelicula',{headers: {
            'Authorization': btoa(token)}, data: peli})
    }
}