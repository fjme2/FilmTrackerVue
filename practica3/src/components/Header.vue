//Componente de la cabecera de la web
//Se muestra el nombre de la aplicación y un botón de Login y otro de Registrar si el usuario no está logeado
//Y un botón de Logout si el usuario está logeado
<template>
  <v-toolbar fixed class="cyan">
    <v-toolbar-title class="mr-4">
       <router-link 
        class="home"
        tag="span"
        :to="{
          name: 'peliculas'
        }">
        FilmTracker
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items><v-btn 
      v-if="!$store.state.isLogged"
      flat dark 
      :to="{name: 'login'}">Login</v-btn></v-toolbar-items>
    <v-toolbar-items><v-btn 
        v-if="!$store.state.isLogged"
        flat dark 
        :to="{name: 'registrar'}">Sign-Up</v-btn></v-toolbar-items>
    <v-toolbar-items><v-btn 
        v-if="$store.state.isLogged"
        flat dark 
        @click="logout">Log Out</v-btn></v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
    methods:{
      logout(){
        //Se borra el token del usuario y se le redirige al componente de login
        this.$store.dispatch('setToken', null)
        this.$router.push({name: 'login'})
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  cursor: pointer;
}
</style>
