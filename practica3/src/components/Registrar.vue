<template>
  <div class='registrar'>
    <h1>Registrar</h1>
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
    <button @click="registrar">Registrar</button>
  </div>
</template>

<script>
import AutenticarService from '@/services/AutenticarService'

export default {
  props: {
    msg: String
  },
  methods:{
    async registrar(){
      await AutenticarService.registrar({
        username: this.username,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
