<script setup lang="ts">
import Button from '../Buttons/Button.vue'

</script>

<template>
  <Button title1="Free" title2="Workout"></Button>
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


