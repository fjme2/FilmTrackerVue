<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
    <panel title="Registrar">
        <v-text-field
          label="Usuario"
          single-line
          outline
          v-model="username"
        ></v-text-field>
        <v-text-field
          label="Email"
          single-line
          outline
          v-model="email"
        ></v-text-field>
        <v-text-field
          label="Contraseña"
          single-line
          outline
          v-model="password"
          :type="'password'"
        ></v-text-field>
        <v-btn class="cyan" @click="registrar">Registrar</v-btn>

        <div class="error" v-html="error" />
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AutenticarService from '@/services/AutenticarService'
import Panel from '@/components/Panel'

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
  },
  components:{
    Panel
  }
}
</script>

<style scoped>
.error{
  color: red;
}

</style>
