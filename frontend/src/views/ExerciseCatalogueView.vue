<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Tab from '@/components/Tab.vue'

const route = useRoute()

const tab = ref('Details')

const items = ['Details', 'Daten']

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

const text = 'Lorem ipsum dolor sit amet...'
</script>

<template>
  <Tab v-model="tab" />
</template>
