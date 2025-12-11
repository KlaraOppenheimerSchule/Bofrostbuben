<script setup lang="ts">
import { reactive, ref, computed, toRefs, watch } from 'vue'

type SetEntry = { reps: string; weight: string }
type Exercise = { id?: string; name: string; muscleGroup?: string; sets?: SetEntry[] }
type Day = { dayIndex: number; exercises: Exercise[] }
type Plan = { name?: string; sessionsPerWeek?: number; days: Day[] }

const props = defineProps<{ plan?: Plan }>()
const emit = defineEmits<{ (e: 'update-plan', plan: Plan): void }>()

// If no plan passed, import the demo plan from repository `data` directory.
import demoPlanJson from '../data/demo-plan.json'

// Use reactive localPlan so we can mutate sets easily. If a prop plan is provided, copy it.
// We deep-clone to avoid mutating parent data or the imported module directly.
const initialPlan: Plan = props.plan ? JSON.parse(JSON.stringify(props.plan)) : JSON.parse(JSON.stringify(demoPlanJson))
const localPlan = reactive<Plan>(initialPlan)

console.log('[WorkoutView] Loaded plan for WorkoutView:', JSON.parse(JSON.stringify(initialPlan)))

// Emit plan updates whenever localPlan changes (deep watch)
watch(
  localPlan,
  (newVal) => {
    console.log('[WorkoutView] localPlan changed (deep watch)', JSON.parse(JSON.stringify(newVal)))
    try {
      emit('update-plan', JSON.parse(JSON.stringify(newVal)))
    } catch (e) {
      // swallow any serialization errors
    }
  },
  { deep: true }
)

// If parent passes a new `plan` prop (for example after handling our `update-plan`),
// merge it into the reactive `localPlan` without replacing the object reference.
watch(
  () => props.plan,
  (p) => {
    if (!p) return
    console.log('[WorkoutView] props.plan changed, syncing into localPlan', JSON.parse(JSON.stringify(p)))
    // preserve the reactive object and update fields
    if (p.name !== undefined) localPlan.name = p.name
    if (p.sessionsPerWeek !== undefined) localPlan.sessionsPerWeek = p.sessionsPerWeek
    // replace contents of days array while keeping same array ref
    const newDays = JSON.parse(JSON.stringify(p.days || []))
    localPlan.days.splice(0, localPlan.days.length, ...newDays)
  }
)

// Days will be shown as numbered tags (Tag 1, Tag 2, ...)

const dayOptions = computed(() => {
  return localPlan.days.map(d => ({ label: `Tag ${d.dayIndex + 1}`, value: d.dayIndex }))
})

// selected day index (defaults to first available day)
const selectedDayIndex = ref<number>(localPlan.days.length > 0 ? localPlan.days[0].dayIndex : 0)

// Ensure the model is always a number (v-select may provide a string)
watch(selectedDayIndex, (v, old) => {
  const n = Number(v)
  console.log('[WorkoutView] selectedDayIndex change', { v, old, n })
  if (Number.isNaN(n)) return
  // reset opened exercise when switching days
  openedExercise.value = 0
})

const selectedDay = computed(() => {
  const idx = Number(selectedDayIndex.value)
  const d = localPlan.days.find(d => d.dayIndex === idx) || null
  console.log('[WorkoutView] computed selectedDay ->', d ? { dayIndex: d.dayIndex, exercises: d.exercises.length } : null)
  return d
})

// expansion model for exercises: single-panel mode, store the index of opened exercise
const openedExercise = ref(0)

function setsFor(dayIdx: number, exIdx: number) {
  const idx = Number(dayIdx)
  const ex = localPlan.days.find(d => d.dayIndex === idx)?.exercises[exIdx]
  console.log('[WorkoutView] setsFor', { dayIdx, exIdx, idx, found: !!ex })
  if (!ex) return [] as SetEntry[]
  if (!ex.sets) ex.sets = [{ reps: '', weight: '' }]
  return ex.sets
}

function addSet(dayIdx: number, exIdx: number) {
  console.log('[WorkoutView] addSet', { dayIdx, exIdx })
  const sets = setsFor(dayIdx, exIdx)
  sets.push({ reps: '', weight: '' })
}

function removeSet(dayIdx: number, exIdx: number, setIdx: number) {
  const idx = Number(dayIdx)
  console.log('[WorkoutView] removeSet', { dayIdx, exIdx, setIdx })
  const ex = localPlan.days.find(d => d.dayIndex === idx)?.exercises[exIdx]
  if (!ex || !ex.sets) return
  ex.sets.splice(setIdx, 1)
}

</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h3 class="mb-2">Workout durchführen</h3>
      </v-col>

      <!-- Day selector -->
      <v-col cols="12" md="6">
        <v-select
          :items="dayOptions"
          item-title="label"
          item-value="value"
          v-model="selectedDayIndex"
          label="Wähle Trainingstag"
          :return-object="false"
        />
      </v-col>

      <!-- Exercises list (expansion panels) -->
      <v-col cols="12">
        <div v-if="!localPlan.days || localPlan.days.length === 0">Keine Tage im Plan.</div>

        <div v-else>
          <div v-if="(selectedDay?.exercises || []).length === 0">
            Keine Übungen für diesen Tag.
          </div>

          <v-expansion-panels v-else v-model="openedExercise" accordion>
            <v-expansion-panel
              v-for="(ex, exIdx) in (selectedDay ? selectedDay.exercises : [])"
              :key="exIdx"
            >
              <v-expansion-panel-title>
                {{ ex.name }} <span class="text-caption ml-2">({{ ex.muscleGroup }})</span>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <!-- Ensure sets array exists and open the first set by default -->
                <v-row v-for="(set, setIdx) in setsFor(selectedDayIndex, exIdx)" :key="setIdx" class="align-center mb-2">
                  <v-col cols="4">Set {{ setIdx + 1 }}</v-col>
                  <v-col cols="3">
                    <v-text-field v-model="set.reps" label="Reps" dense hide-details/>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="set.weight" label="Gewicht" dense hide-details/>
                  </v-col>
                  <v-col cols="2" class="d-flex justify-end">
                    <v-btn icon color="error" @click="removeSet(selectedDayIndex, exIdx, setIdx)">
                      <v-icon icon="mdi-delete" />
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-btn small color="primary" @click="addSet(selectedDayIndex, exIdx)">+ Satz hinzufügen</v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

