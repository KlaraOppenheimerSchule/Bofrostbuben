import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Exercise {
  id: string
  name: string
  description?: string
  [key: string]: unknown
}

interface Set {
  reps: number | null
  weight: number | null
}

interface Day {
  dayIndex: number
  exercises: Exercise[]
}

interface Plan {
  id: string
  name: string
  days: Day[]
}

interface CurrentWorkout {
  planId: string
  dayIndex: number
  exercises: Array<Exercise & { sets: Set[] }>
}

export const useWorkoutStore = defineStore('workout', () => {
  // State
  const plans = ref<Plan[]>([])
  const selectedPlan = ref<Plan | null>(null)
  const selectedDayIndex = ref<number | null>(null)
  const currentWorkout = ref<CurrentWorkout | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // API base URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  // Actions
  async function fetchPlans(): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/plans`)
      if (!response.ok) throw new Error('Failed to fetch plans')
      plans.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  function selectPlan(plan: Plan): void {
    selectedPlan.value = plan
    selectedDayIndex.value = null
    currentWorkout.value = null
  }

  function selectDay(dayIndex: number): void {
    if (!selectedPlan.value) return
    selectedDayIndex.value = dayIndex
    const day = selectedPlan.value.days.find((d) => d.dayIndex === dayIndex)
    if (day) {
      currentWorkout.value = {
        planId: selectedPlan.value.id,
        dayIndex: day.dayIndex,
        exercises: day.exercises.map((exercise) => ({
          ...exercise,
          sets: [],
        })),
      }
    }
  }

  function addSet(exerciseIndex: number): void {
    if (currentWorkout.value && currentWorkout.value.exercises[exerciseIndex]) {
      currentWorkout.value.exercises[exerciseIndex].sets.push({
        reps: null,
        weight: null,
      })
    }
  }

  function removeSet(exerciseIndex: number, setIndex: number): void {
    if (currentWorkout.value && currentWorkout.value.exercises[exerciseIndex]) {
      currentWorkout.value.exercises[exerciseIndex].sets.splice(setIndex, 1)
    }
  }

  function updateSet(exerciseIndex: number, setIndex: number, field: string, value: unknown): void {
    if (currentWorkout.value && currentWorkout.value.exercises[exerciseIndex]) {
      const set = currentWorkout.value.exercises[exerciseIndex].sets[setIndex]
      if (set) {
        set[field as keyof Set] = (
          field === 'reps' || field === 'weight' ? Number(value) : value
        ) as number | null
      }
    }
  }

  async function saveWorkout(): Promise<unknown> {
    if (!currentWorkout.value) return
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/workout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentWorkout.value),
      })
      if (!response.ok) throw new Error('Failed to save workout')
      const saved = await response.json()
      currentWorkout.value = null
      return saved
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  function resetWorkout(): void {
    selectedPlan.value = null
    selectedDayIndex.value = null
    currentWorkout.value = null
  }

  return {
    plans,
    selectedPlan,
    selectedDayIndex,
    currentWorkout,
    loading,
    error,
    fetchPlans,
    selectPlan,
    selectDay,
    addSet,
    removeSet,
    updateSet,
    saveWorkout,
    resetWorkout,
  }
})
