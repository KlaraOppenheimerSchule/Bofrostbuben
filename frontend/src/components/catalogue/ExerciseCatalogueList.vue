<script setup lang="ts">
import { ref, computed } from 'vue'

const itemPlaceholders = [
  {
    exerciseName: 'Liegestützen',
    muscleGroup: 'Muskelgruppe 1',
  },
  {
    exerciseName: 'Situps',
    muscleGroup: 'Muskelgruppe 2',
  },
  {
    exerciseName: 'Benchpress',
    muscleGroup: 'Muskelgruppe 3',
  },
]

const selectedExercise = ref(null)
const searchInput = ref('')

const filteredItems = computed(() => {
  if (!selectedExercise.value) {
    return itemPlaceholders
  }

  return itemPlaceholders.filter(item =>
    item.exerciseName === selectedExercise.value
  )
})

const autocompleteItems = computed(() => {
  // Only show items if user has typed something
  if (!searchInput.value || searchInput.value.length === 0) {
    return []
  }
  return itemPlaceholders
})

</script>

<template>
  <v-container class="mx-auto">
    <v-autocomplete v-model="selectedExercise" v-model:search="searchInput" :items="autocompleteItems"
      item-title="exerciseName" item-value="exerciseName" label="Übung suchen..." prepend-inner-icon="mdi-magnify"
      clearable variant="outlined" density="comfortable" class="mb-4" no-data-text="Keine Übungen gefunden">
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props" :subtitle="item.raw.muscleGroup"></v-list-item>
      </template>
    </v-autocomplete>

    <v-list lines="two">
      <template v-for="(item, index) in filteredItems" :key="index">
        <v-list-item :title="item.exerciseName" :subtitle="item.muscleGroup" :to="`/exercise/${index}`">
          <template v-slot:subtitle="{ subtitle }">
            <div v-html="subtitle"></div>
          </template>

          <template v-slot:append>
            <v-icon>mdi-arrow-right</v-icon>
          </template>
        </v-list-item>

        <v-divider v-if="index < filteredItems.length - 1" :inset="true"></v-divider>
      </template>
    </v-list>

    <v-card v-if="filteredItems.length === 0" class="pa-4 text-center" variant="outlined">
      <v-card-text>
        <v-icon size="48" color="grey">mdi-magnify</v-icon>
        <div class="text-h6 mt-2">Keine Übungen gefunden</div>
        <div class="text-body-2 text-grey">Wählen Sie eine Übung aus</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
