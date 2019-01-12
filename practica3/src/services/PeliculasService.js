import Api from '@/services/Api'

export default {
    allPeliculas(){
        return Api().get('pelicula')
    },
    crearPelicula(peli){
        return Api().post('pelicula',peli)
    }
}