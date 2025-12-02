<script setup lang="ts">
import { ref } from 'vue'

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

// generate the random number once
const randomNumber = ref(getRandomInt(100))

//the function will navigate to the history later
function streakTracken(): void {
  console.log('User would navigate to the history screen')
}
</script>

<template>
  <button @click="streakTracken">
    {{ randomNumber }}
  </button>
</template>
