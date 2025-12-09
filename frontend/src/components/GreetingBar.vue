<script setup lang="ts">
import { ref } from 'vue'
import StreakTracker from './StreakTracker.vue'

const names = ['Benjamin Nethanyahu', 'Charlie', 'Fortnite', 'SixSeven']
const UserName = ref(names[Math.floor(Math.random() * names.length)])

</script>

<template>
  <div class="greeting-container">
    <RouterLink to="/ProfileView" class="link-no-decoration">
      <button class="icon-button">
        <img src="/assets/icons/muskelkater.svg" alt="Logo" class="icon-img" />
      </button>
    </RouterLink>
    Hallo, {{ UserName }}!
  </div>
</template>

<style scoped>
</style>
