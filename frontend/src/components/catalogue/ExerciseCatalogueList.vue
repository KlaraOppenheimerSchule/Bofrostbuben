<script setup lang="ts">
import { ref, computed } from 'vue'

const itemPlaceholders = [
  { id: 1, exerciseName: 'Liegestützen', muscleGroup: 'Muskelgruppe 1' },
  { id: 2, exerciseName: 'Situps', muscleGroup: 'Muskelgruppe 2' },
  { id: 3, exerciseName: 'Benchpress', muscleGroup: 'Muskelgruppe 3' },
  { id: 4, exerciseName: 'Kniebeugen', muscleGroup: 'Beine' },
  { id: 5, exerciseName: 'Kreuzheben', muscleGroup: 'Rücken' },
  { id: 6, exerciseName: 'Klimmzüge', muscleGroup: 'Rücken' },
  { id: 7, exerciseName: 'Dips', muscleGroup: 'Trizeps' },
  { id: 8, exerciseName: 'Bizepscurls', muscleGroup: 'Bizeps' },
  { id: 9, exerciseName: 'Wadenheben', muscleGroup: 'Waden' },
  { id: 10, exerciseName: 'Ausfallschritte', muscleGroup: 'Beine' },
  { id: 11, exerciseName: 'Beinpresse', muscleGroup: 'Beine' },
  { id: 12, exerciseName: 'Bauchcrunches', muscleGroup: 'Bauch' },
  { id: 13, exerciseName: 'Plank', muscleGroup: 'Core' },
  { id: 14, exerciseName: 'Seitstütz', muscleGroup: 'Core' },
  { id: 15, exerciseName: 'Hip Thrusts', muscleGroup: 'Gluteus' },
  { id: 16, exerciseName: 'Glute Bridge', muscleGroup: 'Gluteus' },
  { id: 17, exerciseName: 'Rudern Kabelzug', muscleGroup: 'Rücken' },
  { id: 18, exerciseName: 'Latziehen', muscleGroup: 'Rücken' },
  { id: 19, exerciseName: 'Frontheben', muscleGroup: 'Schultern' },
  { id: 20, exerciseName: 'Seitheben', muscleGroup: 'Schultern' },
  { id: 21, exerciseName: 'Überkopfdrücken', muscleGroup: 'Schultern' },
  { id: 22, exerciseName: 'Trizepsdrücken Kabel', muscleGroup: 'Trizeps' },
  { id: 23, exerciseName: 'Hammer Curls', muscleGroup: 'Bizeps' },
  { id: 24, exerciseName: 'Chest Fly', muscleGroup: 'Brust' },
  { id: 25, exerciseName: 'Butterfly Reverse', muscleGroup: 'Schultern/Rücken' },
  { id: 26, exerciseName: 'Mountain Climbers', muscleGroup: 'Cardio/Core' },
  { id: 27, exerciseName: 'Burpees', muscleGroup: 'Ganzkörper' },
  { id: 28, exerciseName: 'Russian Twist', muscleGroup: 'Core' },
  { id: 29, exerciseName: 'Hollow Hold', muscleGroup: 'Core' },
  { id: 30, exerciseName: 'Superman', muscleGroup: 'Rücken' },
  { id: 31, exerciseName: 'Good Mornings', muscleGroup: 'Rücken/Beine' },
  { id: 32, exerciseName: 'Farmer Walk', muscleGroup: 'Ganzkörper' },
  { id: 33, exerciseName: 'Shrugs', muscleGroup: 'Nacken' },
  { id: 34, exerciseName: 'Beinbeuger Maschine', muscleGroup: 'Beine' },
  { id: 35, exerciseName: 'Beinstrecker Maschine', muscleGroup: 'Beine' },
  { id: 36, exerciseName: 'Arnold Press', muscleGroup: 'Schultern' },
  { id: 37, exerciseName: 'Trizeps Kickbacks', muscleGroup: 'Trizeps' },
  { id: 38, exerciseName: 'Reverse Lunges', muscleGroup: 'Beine' },
  { id: 39, exerciseName: 'Step-Ups', muscleGroup: 'Beine' },
  { id: 40, exerciseName: 'Box Jumps', muscleGroup: 'Beine/Cardio' },
  { id: 41, exerciseName: 'Sprint-Intervalle', muscleGroup: 'Cardio' },
  { id: 42, exerciseName: 'Rope Slams', muscleGroup: 'Ganzkörper' },
  { id: 43, exerciseName: 'Kettlebell Swings', muscleGroup: 'Ganzkörper' },
  { id: 44, exerciseName: 'Kettlebell Goblet Squat', muscleGroup: 'Beine' },
  { id: 45, exerciseName: 'Kettlebell Deadlift', muscleGroup: 'Beine/Rücken' },
  { id: 46, exerciseName: 'Face Pulls', muscleGroup: 'Schultern/Rücken' },
  { id: 47, exerciseName: 'T-Bar Row', muscleGroup: 'Rücken' },
  { id: 48, exerciseName: 'Incline Benchpress', muscleGroup: 'Brust' },
  { id: 49, exerciseName: 'Decline Benchpress', muscleGroup: 'Brust' },
  { id: 50, exerciseName: 'Butterfly Maschine', muscleGroup: 'Brust' },
]

const selectedExercise = ref(null)
const searchInput = ref('')

const filteredItems = computed(() => {
  if (!selectedExercise.value) {
    return itemPlaceholders
  }

  return itemPlaceholders.filter((item) => item.exerciseName === selectedExercise.value)
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
    <v-autocomplete
      v-model="selectedExercise"
      v-model:search="searchInput"
      :items="autocompleteItems"
      item-title="exerciseName"
      item-value="exerciseName"
      label="Übung suchen..."
      prepend-inner-icon="mdi-magnify"
      clearable
      variant="outlined"
      density="comfortable"
      class="mb-4"
      no-data-text="Keine Übungen gefunden"
    >
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props" :subtitle="item.raw.muscleGroup"></v-list-item>
      </template>
    </v-autocomplete>

    <v-list lines="two">
      <template v-for="(item, index) in filteredItems" :key="index">
        <v-list-item
          :title="item.exerciseName"
          :subtitle="item.muscleGroup"
          :to="`/exercise/${item.id}`"
        >
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
