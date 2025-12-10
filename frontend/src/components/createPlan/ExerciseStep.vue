<script setup lang="ts">
interface Exercise {
  name: string;
  muscleGroup?: string;
}
interface Plan {
  exercises: Exercise[];
}

const props = defineProps<{ plan: Plan }>();
const emit = defineEmits<{
  (e: "next", payload?: Partial<Plan>): void;
  (e: "prev"): void;
  (e: "update-plan", payload: Partial<Plan>): void;
}>();

function addMockExercise() {
  const ex: Exercise = { name: "Bankdrücken", muscleGroup: "Brust" };
  props.plan.exercises.push(ex);
  emit("update-plan", { exercises: props.plan.exercises });
}

function finish() {
  emit("next");
}
</script>

<template>
  <div>
    <div class="mb-2">Übungen (Katalog & Auswahl)</div>

    <div v-if="plan.exercises.length === 0">Noch keine ausgewählten Übungen.</div>

    <div v-else>
      <div v-for="(ex, idx) in plan.exercises" :key="idx">
        • {{ ex.name }} <span class="text-caption">({{ ex.muscleGroup }})</span>
      </div>
    </div>

    <v-row class="mt-4" justify="space-between">
      <div>
        <v-btn text color="grey" @click="addMockExercise">+ Übung hinzufügen</v-btn>
        <v-btn color="primary" class="ml-2" @click="finish">Fertig</v-btn>
      </div>
    </v-row>
  </div>
</template>
