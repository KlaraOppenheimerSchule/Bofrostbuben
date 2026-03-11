import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWorkoutStore = defineStore('workout', () => {
  // State
  const plans = ref([])
  const selectedPlan = ref(null)
  const selectedDayIndex = ref(null)
  const currentWorkout = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // API base URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  // Actions
  async function fetchPlans() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/plans`)
      if (!response.ok) throw new Error('Failed to fetch plans')
      plans.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  function selectPlan(plan) {
    selectedPlan.value = plan
    selectedDayIndex.value = null
    currentWorkout.value = null
  }

  function selectDay(dayIndex) {
    if (!selectedPlan.value) return
    selectedDayIndex.value = dayIndex
    const day = selectedPlan.value.days.find(d => d.dayIndex === dayIndex)
    if (day) {
      currentWorkout.value = {
        planId: selectedPlan.value.id,
        dayIndex: day.dayIndex,
        exercises: day.exercises.map(exercise => ({
          ...exercise,
          sets: []
        }))
      }
    }
  }

  function addSet(exerciseIndex) {
    if (currentWorkout.value && currentWorkout.value.exercises[exerciseIndex]) {
      currentWorkout.value.exercises[exerciseIndex].sets.push({
        reps: null,
        weight: null
      })
    }
  }

  function removeSet(exerciseIndex, setIndex) {
    if (currentWorkout.value && currentWorkout.value.exercises[exerciseIndex]) {
      currentWorkout.value.exercises[exerciseIndex].sets.splice(setIndex, 1)
    }
  }

  function updateSet(exerciseIndex, setIndex, field, value) {
    if (currentWorkout.value && currentWorkout.value.exercises[exerciseIndex]) {
      const set = currentWorkout.value.exercises[exerciseIndex].sets[setIndex]
      if (set) {
        set[field] = field === 'reps' || field === 'weight' ? Number(value) : value
      }
    }
  }

  async function saveWorkout() {
    if (!currentWorkout.value) return
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/workout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentWorkout.value)
      })
      if (!response.ok) throw new Error('Failed to save workout')
      const saved = await response.json()
      currentWorkout.value = null
      return saved
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  function resetWorkout() {
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
    resetWorkout
  }
})
