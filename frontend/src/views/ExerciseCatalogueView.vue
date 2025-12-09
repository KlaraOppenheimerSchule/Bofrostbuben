<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import Tab from '@/components/Tab.vue'
import StreakTracker from "@/components/StreakTracker.vue";
import GreetingBar from "@/components/GreetingBar.vue";

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

const activeComponent = computed(() => {
  return tab.value === 'Übungshistorie'
    ? StreakTracker
    : GreetingBar
})
</script>


<template>
  <Tab v-model="tab" />
  <component :is="activeComponent" />
</template>

<style scoped>

</style>
