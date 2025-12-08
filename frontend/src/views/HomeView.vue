<script setup lang="ts">
import StartWorkoutButton from '../components/StartWorkoutButton.vue'
import GreetingBar from "@/components/GreetingBar.vue";
import StreakTracker from "@/components/StreakTracker.vue";
</script>

<template>
  <greeting-bar/>
  <streak-tracker/>
  <StartWorkoutButton/>
</template>
