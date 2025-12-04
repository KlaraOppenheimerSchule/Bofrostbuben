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
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
    <RouterLink to="/createPlan">Go to Create Plan</RouterLink>
    <RouterLink to="/history">Go to History</RouterLink>
    <RouterLink to="/settings">Go to Settings</RouterLink>
    <RouterLink to="/profile">Go to Profile</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
  <StartWorkoutButton></StartWorkoutButton>
  <NavigationBar></NavigationBar>
</template>

<style scoped></style>
