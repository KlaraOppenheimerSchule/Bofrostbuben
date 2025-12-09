<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <v-app>
    <v-container class="align-center justify-center">
      <RouterView />
      <NavigationBar />
    </v-container>
  </v-app>
</template>

<style scoped></style>
