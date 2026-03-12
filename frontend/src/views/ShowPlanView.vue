<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWorkoutStore } from '@/stores/workout_store'

const router = useRouter()
const workoutStore = useWorkoutStore()

onMounted(async () => {
  await workoutStore.fetchPlans()
})

const selectPlan = (plan) => {
  workoutStore.selectPlan(plan)
  router.push('/ExecuteWorkoutView')
}
</script>

<template>
  <div class="plans-container">
    <h1>Workout Pläne</h1>

    <v-progress-linear
      v-if="workoutStore.loading"
      indeterminate
    ></v-progress-linear>

    <v-alert
      v-if="workoutStore.error"
      type="error"
      closable
    >
      {{ workoutStore.error }}
    </v-alert>

    <div v-if="!workoutStore.loading && workoutStore.plans.length === 0">
      <p>Keine Pläne verfügbar</p>
    </div>

    <v-expansion-panels v-if="workoutStore.plans.length > 0">
      <v-expansion-panel
        v-for="plan in workoutStore.plans"
        :key="plan.id"
      >
        <template v-slot:title>
          <div class="plan-title">
            <span>{{ plan.name }}</span>
            <span class="ml-2 text-caption">{{ plan.sessionsPerWeek }} Sessions/Woche</span>
          </div>
        </template>

        <template v-slot:text>
          <div class="plan-content">
            <div class="days-list">
              <div
                v-for="day in plan.days"
                :key="day.dayIndex"
                class="day-item"
              >
                <h4>Tag {{ day.dayIndex + 1 }}</h4>
                <ul class="exercises-list">
                  <li
                    v-for="(exercise, idx) in day.exercises"
                    :key="idx"
                    class="exercise-item"
                  >
                    <span class="exercise-name">{{ exercise.name }}</span>
                    <span class="exercise-muscle">{{ exercise.muscleGroup }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <v-btn
              color="primary"
              block
              class="mt-4"
              @click="selectPlan(plan)"
            >
              Plan Auswählen
            </v-btn>
          </div>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style scoped>
.plans-container {
  padding: 20px;
}

.plan-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.plan-content {
  padding: 16px 0;
}

.days-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.day-item {
  border-left: 3px solid #1976d2;
  padding-left: 16px;
}

.day-item h4 {
  margin: 0 0 8px 0;
  font-weight: 600;
}

.exercises-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.exercise-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}

.exercise-name {
  font-weight: 500;
}

.exercise-muscle {
  font-size: 0.85rem;
  color: #666;
  background: rgba(0, 0, 0, 0.08);
  padding: 2px 8px;
  border-radius: 4px;
}

.ml-2 {
  margin-left: 8px;
}

.mt-4 {
  margin-top: 16px !important;
}
</style>
