<script setup lang="ts">
import Button from './Button.vue'

function handleClick() {
  alert('Es würde jetzt ein Workout gestartet werden')
}
</script>

<template>
  <Button title1="Workout" title2="starten" @click="handleClick"> </Button>
</template>

<style scoped>
.start_workout-btn::before {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-top: 2rem solid transparent;
  border-bottom: 2rem solid transparent;
  border-left: 3rem solid white;
  margin-bottom: 0.8rem;
}
</style>
