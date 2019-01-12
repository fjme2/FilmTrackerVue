<template>
  <v-layout row>
    <v-flex xs10 offset-xs1>
      <panel title="Peliculas">
        <div v-for="peli in pelis" :key="peli.id">
          {{peli.titulo}} -
          {{peli.fecha}} 
          <v-btn 
          small 
          @click="navigateTo({name:'peli', params: {peliId: peli.id}})">
          <v-icon>info</v-icon>
          </v-btn>
          <v-btn small><v-icon>delete</v-icon></v-btn>
          </div>
          <router-link :to="{name: 'crear-pelicula'}">
            <v-btn small><v-icon>add</v-icon></v-btn>
          </router-link>
          
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
  },
  methods:{
      navigateTo(route){
        this.$router.push(route)
      }
  }
}

</script>

<style scoped>
</style>
