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
const showDeleteDialog = ref(false)
const showEditDialog = ref(false)
const exerciseToDelete = ref<any | null>(null)
const exerciseToEdit = ref<any | null>(null)
const formData = ref({
  name: '',
  description: ''
})
const editFormData = ref({
  id: '',
  name: '',
  description: ''
})

const submitting = ref(false)
const formError = ref<string | null>(null)

const API_BASE_URL = 'http://localhost:3000'

const search = ref('')
const selectedMuscleGroup = ref<string | null>(null)
const muscleGroups = ref<string[]>([])

// ============= FILTERED EXERCISES =============
const filteredExercises = computed(() => {
  return exercises.value.filter((e) => {
    const matchesSearch = (e.name || '').toLowerCase().includes(search.value.toLowerCase())
    const matchesMuscleGroup = !selectedMuscleGroup.value || e.muscleGroup === selectedMuscleGroup.value
    return matchesSearch && matchesMuscleGroup
  })
})

// ============= HELPERS =============
const isExerciseOverviewTabActive = () => tab.value === 'Übungsübersicht'
const clearFormError = () => { formError.value = null }
const clearExercisesError = () => { error.value = null }

const validateExerciseForm = () => {
  if (!formData.value.name.trim()) {
    formError.value = 'Exercise name is required'
    return false
  }
  return true
}

const resetFormData = () => { formData.value = { name: '', description: '' } }

// ============= DIALOG ACTIONS =============
const openCreateExerciseDialog = () => { showCreateDialog.value = true; clearFormError() }
const closeCreateExerciseDialog = () => { showCreateDialog.value = false; resetFormData(); clearFormError() }

const openEditDialog = (exercise: any) => {
  exerciseToEdit.value = exercise
  editFormData.value = {
    id: exercise._id,
    name: exercise.name,
    description: exercise.description || ''
  }
  showEditDialog.value = true
  clearFormError()
}
const closeEditDialog = () => { showEditDialog.value = false; exerciseToEdit.value = null; clearFormError() }

const openDeleteDialog = (exercise: any) => { exerciseToDelete.value = exercise; showDeleteDialog.value = true }
const closeDeleteDialog = () => { showDeleteDialog.value = false; exerciseToDelete.value = null }

const confirmDelete = async () => {
  if (!exerciseToDelete.value) return
  await deleteExerciseAndRemoveFromList(exerciseToDelete.value._id)
  closeDeleteDialog()
}

// ============= API CALLS =============
const fetchMuscleGroupsFromBackend = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/muscle-groups`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    muscleGroups.value = data || []
  } catch (err) {
    // Fallback: derive muscle groups from loaded exercises
    muscleGroups.value = [...new Set(
      exercises.value
        .map((e) => e.muscleGroup)
        .filter((g): g is string => !!g)
    )]
  }
}

const fetchExercisesFromBackend = async () => {
  loading.value = true
  clearExercisesError()
  try {
    const response = await fetch(`${API_BASE_URL}/exercises`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    exercises.value = data || []
    await fetchMuscleGroupsFromBackend()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch exercises'
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
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const created = await response.json()
    exercises.value.push(created)
    closeCreateExerciseDialog()
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Failed to create exercise'
  } finally { submitting.value = false }
}

const deleteExerciseAndRemoveFromList = async (exerciseId: string) => {
  submitting.value = true
  clearFormError()
  try {
    const response = await fetch(`${API_BASE_URL}/exercise/${exerciseId}`, { method: 'DELETE' })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    exercises.value = exercises.value.filter(e => e._id !== exerciseId)
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Failed to delete exercise'
  } finally { submitting.value = false }
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
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const index = exercises.value.findIndex(e => e._id === editFormData.value.id)
    if (index !== -1) {
      exercises.value[index] = {
        ...exercises.value[index],
        name: editFormData.value.name,
        description: editFormData.value.description
      }
    }
    closeEditDialog()
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Failed to edit exercise'
  } finally { submitting.value = false }
}

// ============= FORM SUBMISSION =============
const submitExerciseForm = async () => { if (!validateExerciseForm()) return; await createExerciseAndAddToList() }
const submitEditForm = async () => {
  if (!editFormData.value.name.trim()) { formError.value = 'Exercise name is required'; return }
  await editExerciseAndUpdateList()
}

// ============= LIFECYCLE =============
const loadExercisesWhenTabIsShown = () => { if (isExerciseOverviewTabActive()) fetchExercisesFromBackend() }
onMounted(() => { loadExercisesWhenTabIsShown() })
watch(() => tab.value, () => { loadExercisesWhenTabIsShown() })

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
</script>

<template>
  <v-card color="basil">
    <v-tabs v-model="tab" color="basil" grow>
      <v-tab v-for="item in items" :key="item" :text="item" :value="item"></v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <!-- Übungsübersicht -->
      <v-tabs-window-item value="Übungsübersicht">
        <v-card color="basil" flat>
          <v-card-text>
            <v-btn color="primary" @click="openCreateExerciseDialog" class="mb-4">Create New Exercise</v-btn>

            <v-row class="mb-4">
              <v-col cols="12" sm="6">
                <v-text-field v-model="search" label="Search exercise" clearable density="compact" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedMuscleGroup"
                  :items="muscleGroups"
                  label="Filter by muscle group"
                  clearable
                  density="compact"
                  :loading="loading"
                  no-data-text="No muscle groups available"
                />
              </v-col>
            </v-row>

            <v-progress-circular v-if="loading" indeterminate class="my-4"></v-progress-circular>
            <v-alert v-else-if="error" type="error" class="my-4">{{ error }}</v-alert>
            <v-alert v-else-if="exercises.length === 0" type="info" class="my-4">No exercises available. Create one to get started!</v-alert>
            <v-alert v-else-if="filteredExercises.length === 0" type="info" class="my-4">No exercises match your current filters.</v-alert>

            <v-list v-else>
              <v-list-item v-for="exercise in filteredExercises" :key="exercise._id" class="mb-2">
                <v-card>
                  <v-card-title class="d-flex justify-space-between align-center">
                    <span class="d-flex align-center">
                      {{ exercise.name }}
                      <v-chip size="small" variant="outlined" class="ml-2">{{ exercise.muscleGroup || '–' }}</v-chip>
                    </span>
                    <div>
                      <v-btn icon="mdi-pencil" color="blue" variant="text" @click="openEditDialog(exercise)"></v-btn>
                      <v-btn icon="mdi-delete" color="red" variant="text" @click="openDeleteDialog(exercise)"></v-btn>
                    </div>
                  </v-card-title>

                  <v-card-text>
                    {{ exercise.description || '–' }}
                  </v-card-text>
                </v-card>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-tabs-window-item>

      <!-- Übungshistorie -->
      <v-tabs-window-item value="Übungshistorie">
        <v-card color="basil" flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>

    <!-- Create Dialog -->
    <v-dialog v-model="showCreateDialog" max-width="500px">
      <v-card>
        <v-card-title>Create New Exercise</v-card-title>
        <v-card-text>
          <v-alert v-if="formError" type="error" class="mb-4">{{ formError }}</v-alert>
          <v-text-field v-model="formData.name" label="Exercise Name" placeholder="e.g., Push-ups" required outlined class="mb-4" />
          <v-textarea v-model="formData.description" label="Description" placeholder="Optional description..." outlined rows="3" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeCreateExerciseDialog" :disabled="submitting">Cancel</v-btn>
          <v-btn color="primary" @click="submitExerciseForm" :disabled="submitting" :loading="submitting">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Dialog -->
    <v-dialog v-model="showDeleteDialog" max-width="500px">
      <v-card>
        <v-card-title>Delete Exercise</v-card-title>
        <v-card-text>
          <v-alert v-if="formError" type="error" class="mb-4">{{ formError }}</v-alert>
          Are you sure you want to delete <strong>{{ exerciseToDelete?.name }}</strong>? This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDeleteDialog" :disabled="submitting">Cancel</v-btn>
          <v-btn color="red" @click="confirmDelete" :disabled="submitting" :loading="submitting">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Dialog -->
    <v-dialog v-model="showEditDialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Exercise</v-card-title>
        <v-card-text>
          <v-alert v-if="formError" type="error" class="mb-4">{{ formError }}</v-alert>
          <v-text-field v-model="editFormData.name" label="Exercise Name" placeholder="e.g., Push-ups" required outlined class="mb-4" />
          <v-textarea v-model="editFormData.description" label="Description" placeholder="Optional description..." outlined rows="3" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeEditDialog" :disabled="submitting">Cancel</v-btn>
          <v-btn color="primary" @click="submitEditForm" :disabled="submitting" :loading="submitting">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style></style>