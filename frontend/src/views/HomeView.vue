<script setup lang="ts">
import StartWorkoutButton from '../components/Buttons/StartWorkoutButton.vue'
import GreetingBar from "@/components/GreetingBar.vue";
import StreakTracker from "@/components/StreakTracker.vue";
</script>

<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <v-col cols="auto">
        <GreetingBar />
      </v-col>

      <v-col cols="auto">
        <StreakTracker />
      </v-col>
    </v-row>
  </v-container>

  <StartWorkoutButton/>
</template>
