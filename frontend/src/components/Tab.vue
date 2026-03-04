<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

// ============= STATE =============
const items = ['Übungsübersicht', 'Übungshistorie']

const tab = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const exercises = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const showCreateDialog = ref(false)
const formData = ref({
  name: '',
  muscleGroup: '',
  description: ''
})
const muscleGroups = ['chest', 'back', 'legs', 'shoulders', 'biceps','triceps', 'core', 'cardio']
const submitting = ref(false)
const formError = ref<string | null>(null)

const API_BASE_URL = 'http://localhost:3000'

// ============= HELPERS =============
const isExerciseOverviewTabActive = () => tab.value === 'Übungsübersicht'

const clearFormError = () => {
  formError.value = null
}

const clearExercisesError = () => {
  error.value = null
}

const validateExerciseForm = () => {
  if (!formData.value.name.trim()) {
    formError.value = 'Exercise name is required'
    return false
  }
  if (!formData.value.muscleGroup) {
    formError.value = 'Muscle group is required'
    return false
  }
  return true
}

const resetFormData = () => {
  formData.value = {
    name: '',
    muscleGroup: '',
    description: ''
  }
}

// ============= DIALOG ACTIONS =============
const openCreateExerciseDialog = () => {
  showCreateDialog.value = true
  clearFormError()
}

const closeCreateExerciseDialog = () => {
  showCreateDialog.value = false
  resetFormData()
  clearFormError()
}

// ============= API CALLS =============
const fetchExercisesFromBackend = async () => {
  loading.value = true
  clearExercisesError()
  console.log('Fetching exercises from:', `${API_BASE_URL}/exercises`)
  try {
    const response = await fetch(`${API_BASE_URL}/exercises`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    exercises.value = await response.json()
    console.log('Exercises fetched:', exercises.value)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch exercises'
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
}

const createExerciseAndAddToList = async () => {
  submitting.value = true
  clearFormError()

  try {
    const response = await fetch(`${API_BASE_URL}/exercise`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const created = await response.json()
    exercises.value.push(created)
    closeCreateExerciseDialog()
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Failed to create exercise'
    console.error('Create error:', err)
  } finally {
    submitting.value = false
  }
}

const deleteExerciseAndRemoveFromList = async (exerciseId: string) => {
  submitting.value = true
  clearFormError()

  try {
    const response = await fetch(`${API_BASE_URL}/exercise/${exerciseId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // 🧹 Aus dem Frontend-Array entfernen
    exercises.value = exercises.value.filter(
      exercise => exercise._id !== exerciseId
    )

    console.log('Exercise deleted successfully')
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Failed to delete exercise'
    console.error('Delete error:', err)
  } finally {
    submitting.value = false
  }
}

// ============= FORM SUBMISSION =============
const submitExerciseForm = async () => {
  if (!validateExerciseForm()) return
  await createExerciseAndAddToList()
}

// ============= LIFECYCLE =============
const loadExercisesWhenTabIsShown = () => {
  if (isExerciseOverviewTabActive()) {
    fetchExercisesFromBackend()
  }
}

onMounted(() => {
  console.log('Tab component mounted, current tab:', tab.value)
  loadExercisesWhenTabIsShown()
})

watch(
  () => tab.value,
  (newTab) => {
    console.log('Tab changed to:', newTab)
    loadExercisesWhenTabIsShown()
  }
)

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
</script>

<template>
  <v-card color="basil">
    <v-tabs v-model="tab" color="basil" grow>
      <v-tab v-for="item in items" :key="item" :text="item" :value="item"></v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="Übungsübersicht">
        <v-card color="basil" flat>
          <v-card-text>
            <div v-if="isExerciseOverviewTabActive()">
              <v-btn color="primary" @click="openCreateExerciseDialog" class="mb-4">
                Create New Exercise
              </v-btn>

              <div v-if="loading" class="text-center">
                <v-progress-circular indeterminate></v-progress-circular>
              </div>

              <div v-else-if="error" class="text-error">
                Error: {{ error }}
              </div>

              <div v-else-if="exercises.length === 0" class="text-center">
                No exercises available. Create one to get started!
              </div>

              <v-list v-else>
                <v-list-item v-for="exercise in exercises" :key="exercise._id" class="mb-2">
                  <v-card>
                    <v-card-title class="d-flex justify-space-between align-center">
                      {{ exercise.name }}

                      <v-btn
                        icon="mdi-delete"
                        color="red"
                        variant="text"
                        @click="deleteExerciseAndRemoveFromList(exercise._id)"
                      ></v-btn>
                    </v-card-title>

                    <v-card-text>
                      <p><strong>Muscle Group:</strong> {{ exercise.muscleGroup }}</p>
                      <p><strong>Description:</strong> {{ exercise.description }}</p>
                    </v-card-text>
                  </v-card>
                </v-list-item>
              </v-list>
            </div>
          </v-card-text>
        </v-card>
      </v-tabs-window-item>

      <v-tabs-window-item value="Übungshistorie">
        <v-card color="basil" flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>

    <!-- Create Exercise Dialog -->
    <v-dialog v-model="showCreateDialog" max-width="500px">
      <v-card>
        <v-card-title>Create New Exercise</v-card-title>
        <v-card-text>
          <div v-if="formError" class="text-error mb-4">
            {{ formError }}
          </div>

          <v-text-field
            v-model="formData.name"
            label="Exercise Name"
            placeholder="e.g., Push-ups"
            required
            outlined
            class="mb-4"
          ></v-text-field>

          <v-select
            v-model="formData.muscleGroup"
            :items="muscleGroups"
            label="Muscle Group"
            required
            outlined
            class="mb-4"
          ></v-select>

          <v-textarea
            v-model="formData.description"
            label="Description"
            placeholder="Optional description..."
            outlined
            rows="3"
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeCreateExerciseDialog" :disabled="submitting">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="submitExerciseForm" :disabled="submitting" :loading="submitting">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style></style>
