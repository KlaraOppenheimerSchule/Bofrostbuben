<script setup lang="ts">
import { ref } from "vue";

interface Exercise {
  name: string;
  muscleGroup?: string;
}
interface Day {
  dayIndex: number;
  exercises: Exercise[];
}
interface Plan {
  sessionsPerWeek: number;
  days: Day[];
}

const props = defineProps<{ plan: Plan }>();
const emit = defineEmits<{
  (e: "next", payload?: Partial<Plan>): void;
  (e: "prev"): void;
  (e: "update-plan", payload: Partial<Plan>): void;
}>();

const activeTab = ref(0);

function dayFor(index: number) {
  return props.plan.days.find((d) => d.dayIndex === index);
}

function ensureDay(index: number) {
  let day = props.plan.days.find((d) => d.dayIndex === index);
  if (!day) {
    day = { dayIndex: index, exercises: [] };
    props.plan.days.push(day);
  }
  return day;
}

function addExercise(dayIndex: number) {
  const ex: Exercise = { name: "Liegestützen", muscleGroup: "Brust" };
  const day = ensureDay(dayIndex);
  day.exercises.push(ex);
  emit("update-plan", { days: props.plan.days });
}

function done() {
  emit("next", { days: props.plan.days });
}
</script>


<template>
  <div>
    <div class="mb-2">Tage bearbeiten ({{ plan.sessionsPerWeek }})</div>

    <v-tabs v-model="activeTab">
      <v-tab v-for="i in plan.sessionsPerWeek" :key="i">Tag {{ i }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <v-tab-item v-for="i in plan.sessionsPerWeek" :key="i">
        <div class="pa-2">
          <div v-if="!dayFor(i)">Noch keine Übungen</div>

          <div v-else>
            <div v-for="(ex, idx) in dayFor(i)?.exercises" :key="idx">
              • {{ ex.name }} <span class="text-caption">({{ ex.muscleGroup }})</span>
            </div>
          </div>

          <v-btn class="mt-2" @click="addExercise(i)" small>+ Neue Übung</v-btn>
        </div>
      </v-tab-item>
    </v-tabs-items>

    <v-row class="mt-4" justify="end">
      <v-btn outlined @click="() => emit('prev')">Zurück</v-btn>
      <v-btn color="primary" @click="done">Weiter</v-btn>
    </v-row>
  </div>
</template>

