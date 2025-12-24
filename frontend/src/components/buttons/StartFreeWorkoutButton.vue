<script setup lang="ts">
import { store } from '@/stores/color_store'
</script>


<template>
  <v-btn lass="stack-gap" size="x-large" rounded="xl" min-height="150" min-width="200" color="primary"
    prepend-icon="mdi-dumbbell" :to="'/ExerciseCatalogueView'">Free Workout</v-btn>
</template>
