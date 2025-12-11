<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import Tab from '@/components/Tab.vue'
import ExerciseCatalogueList from '@/components/exerciseStuff/ExerciseCatalogueList.vue';
import ExerciseHistoricalData from '@/components/exerciseStuff/ExerciseHistoricalData.vue';

const route = useRoute()
const tab = ref('Übungsübersicht')

if (route.query.tab === 'Übungshistorie') {
  tab.value = 'Übungshistorie'
}

watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab === 'Übungshistorie') {
      tab.value = 'Übungshistorie'
    } else {
      tab.value = 'Übungsübersicht'
    }
  }
)

// Chooses which component to display under which tab
const activeComponent = computed(() => {
  return tab.value === 'Übungshistorie'
    // which component to show in 'Übungshistorie'
    ? ExerciseHistoricalData
    // which component to show in 'Übungsübersicht'
    : ExerciseCatalogueList
})
</script>

<template>
  <Tab v-model="tab" />
  <component :is="activeComponent" />
</template>

<style scoped></style>
