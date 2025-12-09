<script setup lang="ts">
import { ref } from 'vue'
import StreakTracker from './StreakTracker.vue'

const names = ['Benjamin Nethanyahu', 'Charlie', 'Fortnite', 'SixSeven']
const UserName = ref(names[Math.floor(Math.random() * names.length)])
</script>

<template>
  <v-card
    density="compact"
    prepend-avatar="/assets/icons/muskelkater.svg"
    :title="`Hallo, ${UserName}!`"
    variant="text"
    border
  >
    <StreakTracker />
  </v-card>
</template>

<style scoped></style>
