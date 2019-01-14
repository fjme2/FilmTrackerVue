// Componente para crear una pelicula.
// Se pide el id, titulo, fecha y overview de una pelicula.
<template>
  <v-layout row>
    <v-flex xs10 offset-xs1>
      <panel title="Crear Pelicula" v-if="$store.state.isLogged">
          <v-text-field
          label="id"
          single-line
          outline
          required
          :rules="[required]"
          v-model="peli.id"
        ></v-text-field>
        <v-text-field
          label="Titulo"
          single-line
          outline
          required
          :rules="[required]"
          v-model="peli.titulo"
        ></v-text-field>
        <v-text-field
          label="Fecha"
          single-line
          outline
          required
          :rules="[required]"
          v-model="peli.fecha"
        ></v-text-field>
        <v-textarea
          label="Overview"
          single-line
          outline
          required
          :rules="[required]"
          v-model="peli.overview"
        ></v-textarea>
        <div class="error" v-if="error">
            {{error}}
        </div>
        <v-btn small @click="crear"><v-icon>add</v-icon></v-btn>
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
    data(){
        return{
            //Declaramos el objeto pelicula
            peli: {
                id: '',
                titulo: '',
                fecha: '',
                overview: ''
            },
            error: null,
            required: (value) => !!value || 'Obligatorio'
        }
    },
    methods:{
        async crear(){
            this.error = null
            //Obligamos a que se rellenen todos los campos para poder crear una pelicula
            //de no ser así se mostrará un mensaje de error
            const rellenados = Object 
            .keys(this.peli)
            .every(key => !!this.peli[key])
            if(!rellenados){
                this.error = 'Rellena todos los campos obligatorios'
            }
            try{
                //Llamamos al servidor pasandole un objeto de tipo peli y el token del usuario
                const response = await PeliculasService.crearPelicula(this.peli, this.$store.state.token)
                if(response.status == '200'){
                    //Si el id de la pelicula ya está en la base de datos se muestra un error
                    this.error = 'Ya existe una pelicula con ese id.'
                }else{
                    //Si la pelicula se crea sin errores se redirige al listado de peliculas
                    this.$router.push({name: 'peliculas'})
                }
                
            }catch(err){
                this.error = 'Error al añadir pelicula'
            }
        }
    },
    components: {
        Panel
    }
}

</script>

<style scoped>
</style>
