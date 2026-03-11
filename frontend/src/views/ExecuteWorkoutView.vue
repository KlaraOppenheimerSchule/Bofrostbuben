<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWorkoutStore } from '@/stores/workout_store'

const router = useRouter()
const workoutStore = useWorkoutStore()

onMounted(() => {
  if (!workoutStore.selectedPlan) {
    router.push('/ShowPlanView')
  }
})

const selectDay = (dayIndex: number) => {
  workoutStore.selectDay(dayIndex)
}

const handleSaveWorkout = async () => {
  try {
    await workoutStore.saveWorkout()
    router.push('/')
  } catch (err) {
    console.error('Failed to save workout:', err)
  }
}

const handleCancel = () => {
  workoutStore.resetWorkout()
  router.push('/ShowPlanView')
}
</script>

<template>
  <div class="execute-workout-container">
    <div v-if="workoutStore.selectedPlan">
      <h1>{{ workoutStore.selectedPlan.name }}</h1>

      <!-- Day Selection -->
      <div v-if="workoutStore.selectedDayIndex === null" class="day-selection">
        <h2>Tag auswählen</h2>
        <div class="days-grid">
          <v-btn
            v-for="day in workoutStore.selectedPlan.days"
            :key="day.dayIndex"
            variant="outlined"
            class="day-btn"
            @click="selectDay(day.dayIndex)"
          >
            Tag {{ day.dayIndex + 1 }}
          </v-btn>
        </div>
      </div>

      <!-- Workout Execution -->
      <div v-if="workoutStore.selectedDayIndex !== null && workoutStore.currentWorkout" class="workout-execution">
        <div class="workout-header">
          <h2>Tag {{ workoutStore.selectedDayIndex + 1 }} - Training</h2>
          <v-btn
            icon
            small
            variant="text"
            @click="workoutStore.selectedDayIndex = null"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>

        <!-- Progress Indicator -->
        <v-linear-progress
          v-if="workoutStore.loading"
          indeterminate
        ></v-linear-progress>

        <v-alert
          v-if="workoutStore.error"
          type="error"
          closable
        >
          {{ workoutStore.error }}
        </v-alert>

        <!-- Exercises -->
        <div class="exercises-container">
          <div
            v-for="(exercise, exerciseIdx) in workoutStore.currentWorkout.exercises"
            :key="exerciseIdx"
            class="exercise-card"
          >
            <div class="exercise-header">
              <div>
                <h3>{{ exercise.name }}</h3>
                <span class="muscle-group">{{ exercise.muscleGroup }}</span>
              </div>
            </div>

            <!-- Sets -->
            <div class="sets-container">
              <div
                v-if="exercise.sets.length === 0"
                class="no-sets-message"
              >
                Noch keine Sätze hinzugefügt
              </div>

              <div
                v-for="(set, setIdx) in exercise.sets"
                :key="setIdx"
                class="set-row"
              >
                <div class="set-number">Satz {{ setIdx + 1 }}</div>
                <v-text-field
                  label="Wiederholungen"
                  type="number"
                  :value="set.reps"
                  hide-details
                  dense
                  @update:model-value="workoutStore.updateSet(exerciseIdx, setIdx, 'reps', $event)"
                ></v-text-field>
                <v-text-field
                  label="Gewicht (kg)"
                  type="number"
                  :value="set.weight"
                  hide-details
                  dense
                  @update:model-value="workoutStore.updateSet(exerciseIdx, setIdx, 'weight', $event)"
                ></v-text-field>
                <v-btn
                  icon
                  small
                  variant="text"
                  color="error"
                  @click="workoutStore.removeSet(exerciseIdx, setIdx)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>

            <!-- Add Set Button -->
            <v-btn
              size="small"
              variant="tonal"
              class="add-set-btn"
              @click="workoutStore.addSet(exerciseIdx)"
            >
              <v-icon>mdi-plus</v-icon> Satz hinzufügen
            </v-btn>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <v-btn
            variant="tonal"
            @click="handleCancel"
          >
            Abbrechen
          </v-btn>
          <v-btn
            color="success"
            :loading="workoutStore.loading"
            @click="handleSaveWorkout"
          >
            Trainingseinheit Speichern
          </v-btn>
        </div>
      </div>
    </div>

    <div v-else class="no-plan-message">
      <p>Bitte wählen Sie zuerst einen Plan aus.</p>
      <v-btn color="primary" @click="router.push('/ShowPlanView')">
        Zu den Plänen
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.execute-workout-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.day-selection {
  padding: 24px 0;
}

.day-selection h2 {
  margin-bottom: 16px;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}

.day-btn {
  min-height: 60px;
  font-size: 1rem;
}

.workout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  border-bottom: 2px solid #1976d2;
  padding-bottom: 16px;
}

.workout-header h2 {
  margin: 0;
}

.exercises-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.exercise-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  background: #fafafa;
}

.exercise-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.exercise-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.muscle-group {
  display: inline-block;
  background: #1976d2;
  color: white;
  padding: 4px 12px;
  border-radius: 24px;
  font-size: 0.85rem;
  margin-top: 8px;
}

.sets-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  background: white;
  padding: 12px;
  border-radius: 4px;
}

.no-sets-message {
  padding: 16px;
  text-align: center;
  color: #999;
  font-style: italic;
}

.set-row {
  display: grid;
  grid-template-columns: 80px 1fr 1fr auto;
  gap: 12px;
  align-items: flex-end;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
}

.set-number {
  font-weight: 500;
  font-size: 0.95rem;
}

.add-set-btn {
  width: 100%;
}

.action-buttons {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
}

.no-plan-message {
  text-align: center;
  padding: 40px 20px;
}

.no-plan-message p {
  margin-bottom: 16px;
  font-size: 1.1rem;
}
</style>
