<script setup lang="ts">
import {ref} from 'vue'
import StreakTracker from "@/components/StreakTracker.vue";

const names = ['Benjamin Nethanyahu', 'Charlie', 'Fortnite', 'SixSeven']
const UserName = ref(names[Math.floor(Math.random() * names.length)])

function changeToProfile() {
  alert('route to profile')
}
</script>

<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <v-col cols="auto">
        <p class="greeting-container">
          <button class="icon-button" @click="changeToProfile">
            <img src="/assets/icons/muskelkater.svg" alt="Logo" class="icon-img"/>
          </button>
          Hallo, {{ UserName }}!
        </p>
      </v-col>

      <v-col cols="auto">
        <StreakTracker/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.greeting-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}

.icon-button {
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.icon-img {
  display: block;
  width: 5rem;
  height: 5rem;
}
</style>
