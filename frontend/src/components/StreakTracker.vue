<script setup lang="ts">
import { ref } from 'vue'

//NOTE: The random number is only a placeholder for the streak later wich will be available from the backend

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

// generate the random number once
const randomNumber = ref(getRandomInt(100))
</script>

<template>
  <RouterLink to="/history">
    <button>
      <img src="/assets/icons/dumbbell.svg" alt="Dumbbell" style="width: 25px; height: 25px; vertical-align: middle"/>
      {{ randomNumber }}
    </button>
  </RouterLink>
</template>