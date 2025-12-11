<script setup lang="ts">
import { ref } from 'vue'
import StreakTracker from './StreakTracker.vue'

const names = ['Benjamin Nethanyahu', 'Charlie', 'Fortnite', 'SixSeven']
const UserName = ref(names[Math.floor(Math.random() * names.length)])
</script>

<template>
  <v-app-bar color="grey-lighten-4">

    <template v-slot:prepend>
      <v-img :width="64"
        src="/assets/icons/muskelkater.svg">
      </v-img>
    </template>
    <v-app-bar-title>Hallo, {{UserName}}</v-app-bar-title>
    <template v-slot:append>
        <StreakTracker />
    </template>
  </v-app-bar>
</template>

<style scoped></style>


