//Componente del Login
//Se pide un usuario y contraseña
<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
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
      </panel>
      <div class="error">
            {{error}}
      </div>
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
      password:'',
      error: null
    }
  },
  methods:{
    //Metodo para logear al usuario
    async login(){
      try{
        //Se le envia al servidor el usuario y contraseña introducidos
        const response = await AutenticarService.login({
          username: this.username,
          password: this.password
        })
        if(response.status == '200'){
          //Si es correcto se guarda el token y se le redirige a la lista de peliculas
          this.$store.dispatch('setToken', response.data.token)
          this.$router.push({name: 'peliculas'})
        }
        
      }catch(err){
        this.error = err.response.data.error
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
