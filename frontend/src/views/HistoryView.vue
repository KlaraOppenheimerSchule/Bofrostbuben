<script setup lang="ts">
import Calender from '../components/Calender.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToHistoryTab() {
  router.push({
    name: 'ExerciseCatalogue',
    query: { tab: 'Übungshistorie' },
  })
}
</script>

<template>
  <Calender />

  <v-divider />

  <v-btn @click="goToHistoryTab" class="d-flex mx-auto my-4" variant="outlined">
    Show Historical Data
  </v-btn>

  <v-img
    class="d-flex mx-auto"
    src="../assets/icons/NAKTERMANN.jpg"
    max-width="35rem"
    max-height="35rem"
    cover
  />
</template>

<style>
</style>
