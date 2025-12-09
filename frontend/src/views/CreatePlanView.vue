
<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import NameStep from "../components/createPlan/NameStep.vue";
import FrequencyStep from "../components/createPlan/FrequencyStep.vue";
import DayEditor from "../components/createPlan/DayEditor.vue";
import ExercisesStep from "../components/createPlan/ExercisesStep.vue";

// Types
interface Exercise {
  id?: string;
  name: string;
  muscleGroup?: string;
}
interface Day {
  dayIndex: number;
  exercises: Exercise[];
}
interface Plan {
  name: string;
  sessionsPerWeek: number;
  days: Day[];
  exercises: Exercise[];
}

const steps = [
  { component: NameStep, key: "name" },
  { component: FrequencyStep, key: "frequency" },
  { component: DayEditor, key: "days" },
  { component: ExercisesStep, key: "exercises" }
];

const currentStep = ref(0);
const plan = reactive<Plan>({
  name: "",
  sessionsPerWeek: 3,
  days: [],
  exercises: []
});

const progress = computed(() =>
  Math.round(((currentStep.value + 1) / steps.length) * 100)
);

function onNext(payload?: Partial<Plan>) {
  if (payload) onUpdatePlan(payload);
  if (currentStep.value < steps.length - 1) currentStep.value++;
}

function onPrev() {
  if (currentStep.value > 0) currentStep.value--;
}

function onUpdatePlan(payload: Partial<Plan>) {
  Object.assign(plan, payload);
}

function onPrimary() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  } else {
    savePlan();
  }
}

function skipStep() {
  if (currentStep.value < steps.length - 1) currentStep.value++;
}

function savePlan() {
  console.log("Saving plan", JSON.parse(JSON.stringify(plan)));
}
</script>

<template>
  <v-card class="pa-4" elevation="4" max-width="640">
    <v-row align="center" justify="space-between">
      <div>
        <h3 class="mb-0">Trainingsplan erstellen</h3>
        <div class="text-caption">Schritt {{ currentStep + 1 }} / {{ steps.length }}</div>
      </div>
      <v-progress-linear :value="progress" height="8" rounded style="width:220px" />
    </v-row>

    <v-divider class="my-4" />

    <transition name="fade" mode="out-in">
      <keep-alive>
        <component
          :is="steps[currentStep].component"
          :plan="plan"
          :step-index="currentStep"
          :total-steps="steps.length"
          @next="onNext"
          @prev="onPrev"
          @update-plan="onUpdatePlan"
          :key="steps[currentStep].key"
        />
      </keep-alive>
    </transition>

    <v-divider class="my-4" />

    <v-row justify="space-between" align="center">
      <v-btn outlined @click="onPrev" :disabled="currentStep === 0">
        Zurück
      </v-btn>

      <div>
        <v-btn text color="grey" v-if="currentStep < steps.length - 1" @click="skipStep">Überspringen</v-btn>
        <v-btn color="primary" @click="onPrimary">
          {{ currentStep < steps.length - 1 ? 'Weiter' : 'Plan speichern' }}
        </v-btn>
      </div>
    </v-row>
  </v-card>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
