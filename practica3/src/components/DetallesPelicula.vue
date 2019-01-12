<template>
<v-layout row>
    <v-flex xs10 offset-xs1>
      <panel title="Detalles Pelicula">
          <v-text-field
          label="id"
          single-line
          outline
          v-model="id"
        ></v-text-field>
        <v-text-field
          label="Titulo"
          single-line
          outline
          v-model="titulo"
        ></v-text-field>
        <v-text-field
          label="Fecha"
          single-line
          outline
          v-model="fecha"
        ></v-text-field>
        <v-textarea
          label="Overview"
          single-line
          outline
          v-model="overview"
        ></v-textarea>
        <div class="error" v-if="error">
            {{error}}
        </div>
        <div class="error" v-if="err">
            {{err}}
        </div>
        <v-btn small @click="crear"><v-icon>add</v-icon></v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
}

</script>

<style scoped>
</style>
