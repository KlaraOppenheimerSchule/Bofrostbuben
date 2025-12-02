<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StartWorkoutButton',
  setup() {
    const handleClick = () => {
      alert('Es würde jetzt ein Workout gestartet werden')
    }

    return {
      handleClick,
    }
  },
})
</script>

<template>
  <button class="start_workout-btn" @click="handleClick">
    <span>Workout</span>
    <span>starten</span>
  </button>
</template>

<style scoped>
.start_workout-btn {
  border: none;
  color: white;
  background: #710002;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* Responsive sizing */
  width: 12rem;
  height: 12rem;
  border-radius: 1.2rem;
  padding: 0;
  cursor: pointer;

  /* Text */
  font-size: 1.2rem;
  font-weight: 600;
}

/* Play icon */
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
