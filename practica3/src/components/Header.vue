<template>
  <v-toolbar fixed class="cyan">
    <v-toolbar-title class="mr-4">FilmTracker</v-toolbar-title>
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
        this.$store.dispatch('setToken', null)
        this.$router.push({name: 'login'})
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
