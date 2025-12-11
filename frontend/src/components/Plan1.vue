<script setup lang="ts">
import { ref, onMounted } from 'vue'

const exercises = ref([])

onMounted(async () => {
  exercises.value = await fetch('/src/data/plan1.json').then((r) => r.json())
})
</script>

<template>
  <div>
    <h2>Plan 1</h2>

    <ul>
      <li v-for="(exercise, i) in exercises" :key="i">
        {{ exercise.name }} – {{ exercise.reps }} reps
      </li>
    </ul>
  </div>
</template>
