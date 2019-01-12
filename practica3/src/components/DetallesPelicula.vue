<template>
<v-layout row>
    <v-flex xs8 offset-xs2>
      <panel title=Detalles v-if="$store.state.isLogged">
        <v-layout row wrap>
            <v-flex>
            <v-text-field
                v-model="peli.titulo"
                label="Título"
                box
                readonly
            ></v-text-field>
            </v-flex>
        </v-layout>
            <v-layout row wrap>
            <v-flex>
            <v-text-field
                v-model="peli.fecha"
                label="Fecha"
                box
                readonly
            ></v-text-field>
            </v-flex>
        </v-layout>
            <v-layout row wrap>
            <v-flex>
            <v-textarea
                v-model="peli.overview"
                label="Overview"
                box
                readonly
            ></v-textarea>
            </v-flex>
        </v-layout>
         
      </panel>
        <div class="error" v-if="error">
            {{error}}
        </div>
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
            peli: {},
            error: null
        }
    },
    async mounted(){
        const peliId = this.$store.state.route.params.peliId
        this.peli = (await PeliculasService.mostrar(peliId, this.$store.state.token)).data

    },
    components:{
        Panel
    }
}

</script>

<style scoped>
</style>
