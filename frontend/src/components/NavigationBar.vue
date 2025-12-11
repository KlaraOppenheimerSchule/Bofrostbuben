<script setup lang="ts">
import { store } from '@/stores/color_store'
</script>

<template>


<v-bottom-navigation>
      <v-btn icon="mdi-home" color="primary" flat :to="'/HomeView'"></v-btn>
      <v-btn icon="mdi-dumbbell" color="primary" flat :to="'/ExerciseCatalogueView'"></v-btn>
      <v-btn icon="mdi-plus" color="primary" flat :to="'/CreatePlanView'"></v-btn>
      <v-btn icon="mdi-calendar" color="primary" flat :to="'/HistoryView'"></v-btn>
      <v-btn icon="mdi-cog" color="primary" flat :to="'/SettingsView'"></v-btn>
</v-bottom-navigation>

</template>

<style scoped>

</style>
