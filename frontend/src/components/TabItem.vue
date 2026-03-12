<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

// ============= STATE =============
const items = ['Exercise Overview', 'Exercise History']

const tab = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const exercises = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const showCreateDialog = ref(false)
const showDeleteDialog = ref(false)
const showEditDialog = ref(false)
const exerciseToDelete = ref<any | null>(null)
const exerciseToEdit = ref<any | null>(null)
const formData = ref({
  name: '',
  muscleGroup: '',
  description: ''
})
const editFormData = ref({
  id: '',
  name: '',
  muscleGroup: '',
  description: ''
})
const muscleGroups = ['chest', 'back', 'legs', 'shoulders', 'biceps', 'triceps', 'core', 'cardio']
const submitting = ref(false)
const formError = ref<string | null>(null)

const API_BASE_URL = 'http://localhost:3000'

const search = ref('')
const selectedMuscleGroup = ref<string | null>(null)
const muscleGroupFilterOptions = ref<string[]>([])

// ============= FILTERED EXERCISES =============
const filteredExercises = computed(() => {
  return exercises.value.filter((e) => {
    const matchesSearch = (e.name || '').toLowerCase().includes(search.value.toLowerCase())
    const matchesMuscleGroup = !selectedMuscleGroup.value || e.muscleGroup === selectedMuscleGroup.value
    return matchesSearch && matchesMuscleGroup
  })
})

// ============= HELPERS =============
const isExerciseOverviewTabActive = () => tab.value === 'Exercise Overview'

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

const openEditDialog = (exercise: any) => {
  exerciseToEdit.value = exercise
  editFormData.value = {
    id: exercise._id,
    name: exercise.name,
    muscleGroup: exercise.muscleGroup,
    description: exercise.description || ''
  }
  showEditDialog.value = true
  clearFormError()
}

const closeEditDialog = () => {
  showEditDialog.value = false
  exerciseToEdit.value = null
  clearFormError()
}

const openDeleteDialog = (exercise: any) => {
  exerciseToDelete.value = exercise
  showDeleteDialog.value = true
}

const closeDeleteDialog = () => {
  showDeleteDialog.value = false
  exerciseToDelete.value = null
}

const confirmDelete = async () => {
  if (!exerciseToDelete.value) return

  await deleteExerciseAndRemoveFromList(exerciseToDelete.value._id)
  closeDeleteDialog()
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
    muscleGroupFilterOptions.value = [...new Set(
      exercises.value.map((e) => e.muscleGroup).filter((g): g is string => !!g)
    )]
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

    exercises.value = exercises.value.filter(
      exercise => exercise._id !== exerciseId
    )

  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Failed to delete exercise'
    console.error('Delete error:', err)
  } finally {
    submitting.value = false
  }
}

const editExerciseAndUpdateList = async () => {
  submitting.value = true
  clearFormError()

  try {
    const response = await fetch(`${API_BASE_URL}/exercise`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFormData.value)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const index = exercises.value.findIndex(e => e._id === editFormData.value.id)
    if (index !== -1) {
      exercises.value[index] = {
        ...exercises.value[index],
        name: editFormData.value.name,
        muscleGroup: editFormData.value.muscleGroup,
        description: editFormData.value.description
      }
    }

    closeEditDialog()
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Failed to edit exercise'
    console.error('Edit error:', err)
  } finally {
    submitting.value = false
  }
}

// ============= FORM SUBMISSION =============
const submitExerciseForm = async () => {
  if (!validateExerciseForm()) return
  await createExerciseAndAddToList()
}

const submitEditForm = async () => {
  if (!editFormData.value.name.trim()) {
    formError.value = 'Exercise name is required'
    return
  }
  if (!editFormData.value.muscleGroup) {
    formError.value = 'Muscle group is required'
    return
  }
  await editExerciseAndUpdateList()
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
      <v-tabs-window-item value="Exercise Overview">
        <v-card color="basil" flat>
          <v-card-text>
            <div v-if="isExerciseOverviewTabActive()">
              <v-btn color="primary" @click="openCreateExerciseDialog" class="mb-4">
                Create New Exercise
              </v-btn>

              <v-row class="mb-4">
                <v-col cols="12" sm="6">
                  <v-text-field v-model="search" label="Search exercise" clearable density="compact" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="selectedMuscleGroup"
                    :items="muscleGroupFilterOptions"
                    label="Filter by muscle group"
                    clearable
                    density="compact"
                    :loading="loading"
                    no-data-text="No muscle groups available"
                  />
                </v-col>
              </v-row>

              <div v-if="loading" class="text-center">
                <v-progress-circular indeterminate></v-progress-circular>
              </div>

              <div v-else-if="error" class="text-error">
                Error: {{ error }}
              </div>

              <div v-else-if="exercises.length === 0" class="text-center">
                No exercises available. Create one to get started!
              </div>

              <div v-else-if="filteredExercises.length === 0" class="text-center">
                No exercises match your current filters.
              </div>

              <v-list v-else>
                <v-list-item v-for="exercise in filteredExercises" :key="exercise._id" class="mb-2">
                  <v-card>
                    <v-card-title class="d-flex justify-space-between align-center">
                      <span class="d-flex align-center">
                        {{ exercise.name }}
                        <v-chip size="small" variant="outlined" class="ml-2">{{ exercise.muscleGroup || '–' }}</v-chip>
                      </span>

                      <div>
                        <v-btn
                          icon="mdi-pencil"
                          color="blue"
                          variant="text"
                          @click="openEditDialog(exercise)"
                        ></v-btn>

                        <v-btn
                          icon="mdi-delete"
                          color="red"
                          variant="text"
                          @click="openDeleteDialog(exercise)"
                        ></v-btn>
                      </div>
                    </v-card-title>

                    <v-card-text>
                      {{ exercise.description || '–' }}
                    </v-card-text>
                  </v-card>
                </v-list-item>
              </v-list>
            </div>
          </v-card-text>
        </v-card>
      </v-tabs-window-item>

      <v-tabs-window-item value="Exercise History">
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

    <!-- Delete Exercise Dialog -->
    <v-dialog v-model="showDeleteDialog" max-width="500px">
      <v-card>
        <v-card-title>Delete Exercise</v-card-title>

        <v-card-text>
          <div v-if="formError" class="text-error mb-4">
            {{ formError }}
          </div>

          <p>
            Are you sure you want to delete
            <strong>{{ exerciseToDelete?.name }}</strong>?
          </p>
          <p class="text-caption">
            This action cannot be undone.
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            @click="closeDeleteDialog"
            :disabled="submitting"
          >
            Cancel
          </v-btn>

          <v-btn
            color="red"
            @click="confirmDelete"
            :loading="submitting"
            :disabled="submitting"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Exercise Dialog -->
    <v-dialog v-model="showEditDialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Exercise</v-card-title>
        <v-card-text>
          <div v-if="formError" class="text-error mb-4">
            {{ formError }}
          </div>

          <v-text-field
            v-model="editFormData.name"
            label="Exercise Name"
            placeholder="e.g., Push-ups"
            required
            outlined
            class="mb-4"
          ></v-text-field>

          <v-select
            v-model="editFormData.muscleGroup"
            :items="muscleGroups"
            label="Muscle Group"
            required
            outlined
            class="mb-4"
          ></v-select>

          <v-textarea
            v-model="editFormData.description"
            label="Description"
            placeholder="Optional description..."
            outlined
            rows="3"
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeEditDialog" :disabled="submitting">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="submitEditForm" :disabled="submitting" :loading="submitting">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style></style>