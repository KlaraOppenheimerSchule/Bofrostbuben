<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="align-center justify-center">
        <RouterView />
      </v-container>
    </v-main>

    <NavigationBar />
  </v-app>
</template>

<style scoped></style>
