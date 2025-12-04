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
  <RouterLink to="/historyView" class="linkNoDecoration">
    <button class="dumbbellButton">
      {{ randomNumber }}
      <img src="/assets/icons/dumbbell.svg" alt="Dumbbell" class="dumbbellIcon" />
    </button>
  </RouterLink>
</template>

<style scoped>
.linkNoDecoration {
  text-decoration: none;
}

.dumbbellButton {
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dumbbellIcon {
  display: block;
  width: 2rem;
  height: 2rem;
}
</style>