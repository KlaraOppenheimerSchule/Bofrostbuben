<script setup lang="ts">
import { store } from '@/stores/color_store'
</script>

<template>
  <v-bottom-navigation app :elevation="6" grow>
  <v-btn rounded="xl"
  value="HomeView"
  :to="'/HomeView'"
  >
    <v-icon
      color="green-darken-2"
      icon="mdi-home"
      size="large"
    ></v-icon>

    <span>Home</span>
  </v-btn>

  <v-btn 
  value="ExerciseCatalogView"
  :to="'/ExerciseCatalogueView'">
    <v-icon
      color="green-darken-2"
      icon="mdi-dumbbell"
      size="large"
    ></v-icon>

    <span>Catalog</span>
  </v-btn>

  <v-btn 
  value="CreatePlanView"
  :to="'/CreatePlanView'">
    <v-icon
      color="green-darken-2"
      icon="mdi-plus"
      size="large"
    ></v-icon>

    <span>New Plan</span>
  </v-btn>

  <v-btn value="HistoryView"
  :to="'/HistoryView'">
    <v-icon
      color="green-darken-2"
      icon="mdi-calendar"
      size="large"
    ></v-icon>

    <span>History</span>
  </v-btn>

  <v-btn value="SettingsView"
  :to="'/SettingsView'">
    <v-icon
      color="green-darken-2"
      icon="mdi-cog"
      size="large"
    ></v-icon>

    <span>Settings</span>
  </v-btn>
</v-bottom-navigation>
</template>

<style scoped>
</style>
