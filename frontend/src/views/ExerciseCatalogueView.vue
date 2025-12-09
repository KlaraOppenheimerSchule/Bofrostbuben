<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Tab from '@/components/Tab.vue'

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
    }
  },
)
</script>

<template>
  <Tab v-model="tab" />
</template>

<style scoped></style>
