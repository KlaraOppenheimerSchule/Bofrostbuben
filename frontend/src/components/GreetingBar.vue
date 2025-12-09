<script setup lang="ts">
import { ref } from 'vue'

const names = ['Benjamin Nethanyahu', 'Charlie', 'Fortnite', 'SixSeven']
const UserName = ref(names[Math.floor(Math.random() * names.length)])

</script>

<template>
  <v-card
            class="mb-2"
            density="compact"
            prepend-avatar="/assets/icons/muskelkater.svg"
            :title="`Hallo, ${UserName}!`"
            variant="text"
            border
          >
  </v-card>
</template>

<style scoped>
</style>
