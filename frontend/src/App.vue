<script setup lang="ts">
import BoilerPlate from './components/BoilerPlate.vue'
import StartWorkoutButton from './components/StartWorkoutButton.vue';
import StreakTracker from './components/StreakTracker.vue'
</script>

<template>
  <h1>Hello App!</h1>
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
  <BoilerPlate>
  </BoilerPlate>

  <StartWorkoutButton/>
  <StreakTracker>
  </StreakTracker>
  <GreetingBar></GreetingBar>
</template>


<style scoped></style>
