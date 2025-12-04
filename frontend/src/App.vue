<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
import StreakTracker from './components/StreakTracker.vue'
import GreetingBar from './components/GreetingBar.vue'
</script>

<template>
  <GreetingBar />
  <StreakTracker></StreakTracker>
  <main>
    <RouterView />
  </main>
  <NavigationBar></NavigationBar>
</template>

<style scoped></style>
