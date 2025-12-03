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
  <RouterLink to="/history" class="link-no-decoration">
    <button class="dumbbellButton">
      {{ randomNumber }}
      <img src="/assets/icons/dumbbell.svg" alt="Dumbbell" class="dumbbell-icon" />
    </button>
  </RouterLink>
</template>

<style scoped>
.link-no-decoration {
  text-decoration: none;
}

.dumbbellButton {
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dumbbell-icon {
  display: block;
  width: 2rem;
  height: 2rem;
}
</style>