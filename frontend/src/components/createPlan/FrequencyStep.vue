<script setup lang="ts">
import { ref, watch } from "vue";

interface Plan {
  sessionsPerWeek: number;
}

const props = defineProps<{ plan: Plan }>();
const emit = defineEmits<{
  (e: "next", payload?: Partial<Plan>): void;
  (e: "prev"): void;
  (e: "update-plan", payload: Partial<Plan>): void;
}>();

const localSessions = ref<number>(props.plan.sessionsPerWeek);

watch(localSessions, (v) => emit("update-plan", { sessionsPerWeek: v }));

function increment() {
  if (localSessions.value < 7) localSessions.value++;
}

function decrement() {
  if (localSessions.value > 1) localSessions.value--;
}

function next() {
  emit("next", { sessionsPerWeek: localSessions.value });
}
</script>

<template>
  <div>
    <div class="mb-2">Wie viele Einheiten pro Woche?</div>
    <v-row align="center">
      <v-btn icon @click="decrement"><v-icon>mdi-minus</v-icon></v-btn>
      <div class="pa-4">{{ localSessions }}</div>
      <v-btn icon @click="increment"><v-icon>mdi-plus</v-icon></v-btn>
    </v-row>
  </div>
</template>


