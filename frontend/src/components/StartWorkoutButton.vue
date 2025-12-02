<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StartWorkoutButton',
  setup() {
    const handleClick = () => {
      alert('Es würde jetzt ein Workout gestartet werden');
    };

    return {
      handleClick
    };
  }
});
</script>

<template>
  <button class="start_workout-btn" @click="handleClick">
    Workout Starten
  </button>
</template>

<style>
.start_workout-btn {
  border: none;
  color: white;
  background: #710002;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
