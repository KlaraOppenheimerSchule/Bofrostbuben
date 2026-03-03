<script setup lang="ts">
import { ref } from 'vue'
import StreakTracker from './StreakTracker.vue'

const names = ['Benjamin Nethanyahu', 'Charlie', 'Fortnite', 'SixSeven']
const UserName = ref(names[Math.floor(Math.random() * names.length)])
</script>

<template>
  <v-card density="compact" variant="text" border>
    <v-container fluid class="pa-0">
      <v-row align="center" no-gutters>
        <v-col cols="auto" class="d-flex align-center">
          <RouterLink to="/profileView">
            <img src="/assets/icons/muskelkater.svg" alt="Logo" class="avatar-icon" />
          </RouterLink>
        </v-col>

        <v-col cols="auto" class="d-flex align-center"> Hallo, {{ UserName }}! </v-col>

        <v-spacer />

        <v-col cols="auto" class="d-flex align-center">
          <StreakTracker />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style scoped>
.avatar-icon {
  width: 4rem;
  height: 4rem;
}

.greeting-text {
  text-decoration: none;
  color: inherit;
}
</style>
