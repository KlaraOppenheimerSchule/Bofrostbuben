<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Tab from '@/components/Tab.vue'

const route = useRoute()
const tab = ref('Details')

if (route.query.tab === 'Daten') {
  tab.value = 'Daten'
}

watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab === 'Daten') {
      tab.value = 'Daten'
    }
  },
)

</script>

<template>
  <Tab v-model="tab" />
</template>

<style scoped>

</style>
