<script setup>
import { ref, onMounted, watch } from 'vue'
const props = defineProps({
  jsonPath: { type: String, required: true },
  planName: { type: String, default: 'Plan' },
})

const exercises = ref(null)
const loading = ref(false)
const error = ref(null)

async function loadJson(path) {
  loading.value = true
  error.value = null
  exercises.value = null
  try {
    const res = await fetch(path)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    exercises.value = await res.json()
  } catch (err) {
    error.value = err.message || String(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (props.jsonPath) loadJson(props.jsonPath)
})

watch(() => props.jsonPath, (newPath) => {
  if (newPath) loadJson(newPath)
})
</script>

<template>
  <div>
    <h2>{{ props.planName }}</h2>

    <div v-if="loading">Loading…</div>

    <div v-else-if="error">
      <v-alert density="compact" type="error" class="mb-4">
        Fehler beim Laden: {{ error }}
      </v-alert>
    </div>

    <ul v-else-if="Array.isArray(exercises)">
      <li v-for="(ex, i) in exercises" :key="i">
        <strong>{{ ex.name }}</strong> — {{ ex.reps }} reps
      </li>
    </ul>

    <pre v-else-if="exercises">{{ JSON.stringify(exercises, null, 2) }}</pre>

    <div v-else>No exercises available.</div>
  </div>
</template>
