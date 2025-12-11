<script setup lang="ts">
import { ref } from 'vue'
import CreateWorkoutPlanButton from '@/components/buttons/CreateWorkoutPlanButton.vue';
import FreeWorkoutButton from '@/components/buttons/StartFreeWorkoutButton.vue';
import ShowWorkoutPlanButton from '@/components/buttons/ShowWorkoutPlanButton.vue';
import GreetingBar from '@/components/GreetingBar.vue';
//This is a conditional const; if it is true the CreateWorkoutPlanButton is displayed, otherwise the ShowWorkoutPlanButton
const showCreatePlan = ref(true)
</script>

<template>

  <v-main>
    <GreetingBar/>
    <v-container class="d-flex justify-center flex-column align-center"  style="height: 60vh; padding:5rem; gap:1rem;">
      <CreateWorkoutPlanButton v-if="showCreatePlan" align-center/>

      <ShowWorkoutPlanButton v-else />

      <v-spacer height="20"></v-spacer>

      <FreeWorkoutButton align-center/>
    </v-container>
  </v-main>

</template>
