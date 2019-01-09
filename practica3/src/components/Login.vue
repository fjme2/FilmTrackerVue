<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field
            label="Usuario"
            single-line
            outline
            v-model="username"
          ></v-text-field>
          <v-text-field
            label="Contraseña"
            single-line
            outline
            v-model="password"
            :type="'password'"
          ></v-text-field>
          <v-btn class="cyan" @click="login">Entrar</v-btn>

          <div class="error" v-html="error" />
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AutenticarService from '@/services/AutenticarService'

export default {
  data(){
    return{
      username:'',
      password:'',
      error: null
    }
  },
  methods:{
    async login(){
      try{
        const response = await AutenticarService.login({
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        
      }catch(error){
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.error{
  color: red;
}

</style>
