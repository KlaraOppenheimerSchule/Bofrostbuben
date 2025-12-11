<script setup lang="ts">
import StartWorkoutButton from '../components/buttons/StartWorkoutButton.vue'
import GreetingBar from '../components/GreetingBar.vue'
</script>

<template>

  <GreetingBar/>
  <v-main>
    <v-container class="d-flex flex-column align-center justify-center" style="height: 60vh;">
  <StartWorkoutButton align-center/>
    </v-container>
  </v-main>




</template>
