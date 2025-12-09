<script setup lang="ts">
import { ref } from 'vue'

//TODO : The random number is only a placeholder for the streak later wich will be available from the backend
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}
const randomNumber = ref(getRandomInt(100))
</script>

<template>
  <v-col cols="auto">
        <v-btn 
        size="large" 
        rounded="xl"
        :to="'/historyView'">
        {{ randomNumber }}
        <v-icon
          color="green-darken-2"
          icon="mdi-dumbbell"
          size="large"
        >
        </v-icon>
  </v-btn>

</v-col>
</template>

<style scoped>
</style>
