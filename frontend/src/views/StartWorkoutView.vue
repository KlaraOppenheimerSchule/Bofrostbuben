<script setup lang="ts">
import { ref } from 'vue'
import CreateWorkoutPlanButton from '@/components/buttons/CreateWorkoutPlanButton.vue';
import FreeWorkoutButton from '@/components/buttons/StartFreeWorkoutButton.vue';
import ShowWorkoutPlanButton from '@/components/buttons/ShowWorkoutPlanButton.vue';

//This is a conditional const; if it is true the CreateWorkoutPlanButton is displayed, otherwise the ShowWorkoutPlanButton
const showCreatePlan = ref(true)

</script>

<template>
  <CreateWorkoutPlanButton v-if="showCreatePlan" />

  <ShowWorkoutPlanButton v-else />

  <FreeWorkoutButton />
</template>
