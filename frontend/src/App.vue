<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
import StartWorkoutButton from './components/StartWorkoutButton.vue'
import StreakTracker from './components/StreakTracker.vue'
import GreetingBar from './components/GreetingBar.vue'
</script>

<template>
  <GreetingBar />
  <StreakTracker></StreakTracker>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  
  <main>
    <RouterView />
  </main>
  <StartWorkoutButton></StartWorkoutButton>
  <NavigationBar></NavigationBar>
</template>

<style scoped></style>
