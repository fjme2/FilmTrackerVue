<template>
  <v-layout row >
    <v-flex xs10 offset-xs1 >
      <panel title="Peliculas" v-if="$store.state.isLogged">
        <div v-for="peli in pelis" :key="peli.id">
          {{peli.titulo}} -
          {{peli.fecha}} 
          <v-btn 
          small 
          :to="{name:'peli', params: {peliId: peli.id}}">
          <v-icon>info</v-icon>
          </v-btn>
          <v-btn small @click="borrar(peli)"><v-icon>delete</v-icon></v-btn>
          </div>
          <router-link :to="{name: 'crear-pelicula'}">
            <v-btn small><v-icon>add</v-icon></v-btn>
          </router-link>
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
    
    this.pelis = (await PeliculasService.allPeliculas(this.$store.state.token)).data
  },
  methods:{
    async borrar(peli){
      try{
        await PeliculasService.borrar(peli,this.$store.state.token)
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
