<script setup lang="ts">
interface Exercise {
  name: string;
  muscleGroup?: string;
}
interface Day {
  dayIndex: number;
  exercises: Exercise[];
}
interface Plan {
  name: string;
  sessionsPerWeek?: number;
  exercises: Exercise[];
  days: Day[];
}

const props = defineProps<{ plan: Plan }>();
const emit = defineEmits<{
  (e: "next", payload?: Partial<Plan>): void;
  (e: "prev"): void;
  (e: "update-plan", payload: Partial<Plan>): void;
}>();

function goBack() {
  emit("prev");
}

function finish() {
  emit("next");
}

function removeExerciseFromDay(dayIdx: number, exIdx: number) {
  // remove exercise from the specific day's exercises
  props.plan.days[dayIdx].exercises.splice(exIdx, 1);
  emit("update-plan", { days: props.plan.days });
}

const dayNames = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
</script>

<template>
  <div>
    <v-card class="mb-4" variant="text">
      <v-card-title>Trainingsplan Übersicht</v-card-title>
      <v-card-subtitle>{{ plan.name }} - {{ plan.sessionsPerWeek }} Einheiten pro Woche</v-card-subtitle>
    </v-card>

    <!-- Plan Summary -->
    <v-card class="mb-4" variant="outlined">
      <v-card-text>
        <v-empty-state
          v-if="plan.days.length === 0"
          icon="mdi-calendar-blank"
          text="Keine Trainingstage konfiguriert."
          headline=""
        />

        <div v-else>
          <div v-for="(day, idx) in plan.days" :key="idx" class="mb-4">
            <v-subheader class="px-0 font-weight-bold">
              {{ dayNames[day.dayIndex] || `Tag ${day.dayIndex}` }}
            </v-subheader>

            <v-empty-state
              v-if="day.exercises.length === 0"
              icon="mdi-dumbbell"
              text="Keine Übungen"
              headline=""
              class="py-2"
            />

            <div v-else class="ml-4">
              <div v-for="(ex, exIdx) in day.exercises" :key="exIdx" class="mb-2 d-flex align-center">
                <v-chip size="small" variant="outlined" class="mr-2">
                  {{ ex.muscleGroup || "–" }}
                </v-chip>
                <span class="mr-4">{{ ex.name }}</span>
                <v-spacer />
                <v-btn icon size="small" color="error" @click="removeExerciseFromDay(idx, exIdx)" aria-label="Löschen">
                  <v-icon icon="mdi-delete" />
                </v-btn>
              </div>
            </div>

            <v-divider v-if="idx < plan.days.length - 1" class="my-4" />
          </div>
        </div>
      </v-card-text>
    </v-card>


    
  </div>
</template>

<style scoped>
</style>