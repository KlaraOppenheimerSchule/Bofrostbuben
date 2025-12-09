<script setup lang="ts">
</script>

<template>
  <v-col cols="auto">
        <v-btn 
        size="x-large" 
        rounded="xl"
        :to="'/StartFreeWorkoutView'"> Free Workout

        </v-btn>
  </v-col>
</template>

<style scoped>
.start_workout-btn::before {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-top: 2rem solid transparent;
  border-bottom: 2rem solid transparent;
  border-left: 3rem solid white;
  margin-bottom: 0.8rem;
}
</style>


