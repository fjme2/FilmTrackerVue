<template>
<v-layout row>
    <v-flex xs10 offset-xs1>
      <panel title="Peliculas">
        <div v-for="peli in pelis" :key="peli.id">
          {{peli.titulo}} -
          {{peli.fecha}} -
          {{peli.overview}}
          </div>
      </panel>
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
       pelis: null
    }
  },
  async mounted(){
    this.pelis = (await PeliculasService.allPeliculas()).data
  }
}

</script>

<style scoped>
</style>
