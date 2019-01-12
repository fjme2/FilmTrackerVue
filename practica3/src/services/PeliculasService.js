import Api from '@/services/Api'

export default {
    allPeliculas(token){
        return Api().get('pelicula',{headers: {
            'Authorization': btoa(token)}})
    },
    crearPelicula(peli, token){
        return Api().post('pelicula',peli,{headers: {
            'Authorization': btoa(token)}})
    },
    mostrar(peliId, token){
        return Api().get(`pelicula/${peliId}`,{headers: {
            'Authorization': btoa(token)}})
    }
}