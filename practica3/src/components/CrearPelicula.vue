<template>
  <v-layout row>
    <v-flex xs10 offset-xs1>
      <panel title="Crear Pelicula">
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
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import PeliculasService from '@/services/PeliculasService'
export default {
    data(){
        return{
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
            const rellenados = Object 
            .keys(this.peli)
            .every(key => !!this.peli[key])
            if(!rellenados){
                this.error = 'Rellena todos los campos obligatorios'
            }
            try{
                const response = await PeliculasService.crearPelicula(this.peli)
                if(response.status == '200'){
                    this.error = 'Ya existe una pelicula con ese id.'
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
