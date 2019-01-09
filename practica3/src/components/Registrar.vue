<template>
  <v-layout column>
    <v-flex xs10 offset-xs1>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Registrar</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
          <input 
          type="username"
          name="username"
          v-model="username"
          placeholder = "usuario" />
          <br>
          <input 
          type="email"
          name="email"
          v-model="email"
          placeholder = "email" />
          <br>
          <input 
          type="password"
          name="password"
          v-model="password"
          placeholder = "password" />
          <br>
          <v-btn class="cyan" @click="registrar">Registrar</v-btn>

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
      email:'',
      password:'',
      error: null
    }
  },
  methods:{
    async registrar(){
      try{
        await AutenticarService.registrar({
          username: this.username,
          email: this.email,
          password: this.password
        })
        
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
