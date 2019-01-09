import Api from '@/services/Api'

export default {
    allPeliculas(){
        return Api().get('pelicula')
    }
}