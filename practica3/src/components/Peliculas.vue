//Componente que muestra el listado de peliculas
//En el componente además aparecen un botón de Info y un botón de borrar por cada pelicula
//Y un botón de añadir pelicula
<template>
  <v-layout row >
    <v-flex xs10 offset-xs1 >
      <panel title="Peliculas" v-if="$store.state.isLogged">
        <v-layout row>
          <v-flex xs4>
            Título
          </v-flex>
          <v-flex xs4>
            Fecha
          </v-flex>
        </v-layout>
        <div v-for="peli in pelis" :key="peli.id">
          <v-layout row>
            <v-flex xs4>
              <v-card
              tile
              color="#90CAF9">
                <v-card-text>
                  {{peli.titulo}}
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs4>
              <v-card
              color="#90CAF9">
                <v-card-text >
                  {{peli.fecha}}
                </v-card-text> 
              </v-card>
            </v-flex>
            <v-flex xs4>
              <v-card
              color="#90CAF9"
              height="53px">
                <!-- Se le envia al componente DetallesPelicula el id de la pelicula de la que se requieren sus detalles. -->
                <v-btn small flat
                :to="{name:'peli', params: {peliId: peli.id}}">
                  <v-icon>info</v-icon>
                </v-btn>
                <v-btn small flat 
                @click="borrar(peli)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-card>
            </v-flex>
          </v-layout>
            
            </div>
              <v-btn small color="#90CAF9"
              :to="{name: 'crear-pelicula'}">
                <v-icon>add</v-icon>
              </v-btn>  
          <div class="error">
            {{error}}
          </div>
      </panel>
      <div class="error" v-if="!$store.state.isLogged">
            No tiene permisos.
      </div>
    </v-flex>
  </v-layout>
    

   
</template>

<script>
import Panel from '@/components/Panel'
import PeliculasService from '@/services/PeliculasService'

export default {
  components:{
    Panel
  },
  data(){
    return{
       pelis: null,
       error: null
    }
  },
  async mounted(){
    //Se pide el listado de peliculas pasando por parametro el token del usuario
    this.pelis = (await PeliculasService.allPeliculas(this.$store.state.token)).data
  },
  methods:{
    //Método para borrar una película
    async borrar(peli){
      try{
        //Se le manda al servidor la pelicula que se quiere borrar y el token del usuario
        await PeliculasService.borrar(peli,this.$store.state.token)
        //Despues se vuelve a pedir el listado de peliculas actualizado
        this.pelis = (await PeliculasService.allPeliculas(this.$store.state.token)).data
      }catch(err){
        this.error = err
      }
    }
  }
}

</script>

<style scoped>
</style>
