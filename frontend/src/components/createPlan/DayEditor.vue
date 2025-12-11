<script setup lang="ts">
import { ref, computed, watch } from 'vue'

type Exercise = { name: string; muscleGroup?: string }
type Day = { dayIndex: number; exercises: Exercise[] }
interface Plan { sessionsPerWeek: number; days: Day[] }

const props = defineProps<{ plan: Plan }>()
const emit = defineEmits<{
  (e: 'next', payload?: Partial<Plan>): void
  (e: 'prev'): void
  (e: 'update-plan', payload: Partial<Plan>): void
}>()

// zero-based active tab index (0..n-1)
const activeTab = ref<number>(0)

// number of days to render (1..n)
const daysCount = computed(() => Math.max(1, props.plan.sessionsPerWeek))

/**
 * Ensure the plan.days array contains Day objects for indexes 0..n-1.
 * This normalizes the days array when sessionsPerWeek changes.
 */
function normalizeDays(count: number) {
  // remove days with index >= count
  props.plan.days = props.plan.days.filter(d => d.dayIndex < count)
  // add missing days (0..count-1)
  for (let i = 0; i < count; i++) {
    if (!props.plan.days.some(d => d.dayIndex === i)) {
      props.plan.days.push({ dayIndex: i, exercises: [] })
    }
  }
  // keep days sorted by index (optional but helpful)
  props.plan.days.sort((a, b) => a.dayIndex - b.dayIndex)
}

/**
 * Return the Day object for activeTab (or undefined if none).
 * If it doesn't exist we create it (so UI always has a target).
 */
const currentDay = computed(() => {
  if (!props.plan.days) return undefined
  let d = props.plan.days.find(x => x.dayIndex === activeTab.value)
  if (!d) {
    d = { dayIndex: activeTab.value, exercises: [] }
    props.plan.days.push(d)
    // notify parent that days changed
    emit('update-plan', { days: props.plan.days })
  }
  return d
})

// Keep plan.days in sync whenever sessionsPerWeek changes.
watch(
  () => props.plan.sessionsPerWeek,
  (newCount) => {
    const n = Math.max(0, newCount)
    normalizeDays(n)
    // clamp activeTab if it's out of range
    if (activeTab.value >= n) activeTab.value = Math.max(0, n - 1)
    emit('update-plan', { days: props.plan.days })
  },
  { immediate: true }
)

function addExerciseToActiveDay() {
  // replace this with your real exercise picker / modal flow
  const mock: Exercise = { name: 'Liegestützen', muscleGroup: 'Brust' }
  const day = props.plan.days.find(d => d.dayIndex === activeTab.value)
  if (!day) {
    // should not happen because normalizeDays/ currentDay create it, but guard anyway
    props.plan.days.push({ dayIndex: activeTab.value, exercises: [mock] })
  } else {
    day.exercises.push(mock)
  }
  emit('update-plan', { days: props.plan.days })
}

function removeExerciseFromActiveDay(exIdx: number) {
  const day = props.plan.days.find(d => d.dayIndex === activeTab.value)
  if (!day) return
  day.exercises.splice(exIdx, 1)
  emit('update-plan', { days: props.plan.days })
}
</script>

<template>
  <div>
    <div class="mb-2">Tage bearbeiten</div>

    <!-- Tabs header -->
    <v-tabs v-model="activeTab" background-color="transparent" grow>
      <v-tab v-for="n in daysCount" :key="n - 1">TAG {{ n }}</v-tab>
    </v-tabs>

    <!-- ONLY show content for the selected tab -->
    <div class="pa-4">
      <div v-if="!currentDay || currentDay.exercises.length === 0">
        Noch keine Übungen
      </div>

      <div v-else>
        <div v-for="(ex, idx) in currentDay.exercises" :key="idx" class="d-flex align-center justify-space-between mb-2">
          <div>
            • {{ ex.name }} <span class="text-caption">({{ ex.muscleGroup ?? '-' }})</span>
          </div>
          <v-btn icon small color="error" @click="removeExerciseFromActiveDay(idx)" aria-label="Löschen">
            <v-icon icon="mdi-delete" />
          </v-btn>
        </div>
      </div>

      <!-- This button is rendered once for the active tab -->
      <v-btn class="mt-4" @click="addExerciseToActiveDay" small>+ Neue Übung</v-btn>
    </div>

    
  </div>
</template>



<style scoped>
</style>
