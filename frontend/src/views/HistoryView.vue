<script setup lang="ts">
import Calender from '../components/Calender.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToDatenTab() {
  router.push({
    name: 'ExerciseCatalogue',
    query: { tab: 'Daten' },
  })
}
</script>

<template>
  <Calender />
  <v-divider />
  <button @click="goToDatenTab" class="align-center">Show Historical Data</button>
  <img
    class="align-center"
    src="../../public/assets/icons/NAKTERMANN.jpg"
    height="653"
    width="736"
  />
</template>

<style>
.align-center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
