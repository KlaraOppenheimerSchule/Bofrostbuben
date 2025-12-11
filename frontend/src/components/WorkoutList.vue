<script setup>
import { ref, defineAsyncComponent } from 'vue'

const items = [
  { text: 'Plan 1', component: 'Plan1', json: '/data/Plan1.json' },
  { text: 'Plan 2', component: 'Plan2', json: '/data/plan2.json' },
  { text: 'Plan hinzufügen', component: null },
]

const selectedComponent = ref(null)
const selectedPlanName = ref('Keine Auswahl')

function openPlan(item) {
  alert('openPlan called for', item)
  if (!item.component) {
    alert('This item has no component configured:', item)
    return
  }

  selectedComponent.value = defineAsyncComponent(() =>
    import(`@/components/${item.component}.vue`)
      .then((m) => {
        console.log('component loaded:', item.component)
        selectedPlanName.value = item.text
        return m
      })
      .catch((err) => {
        console.error('Failed to load component', item.component, err)
        return {
          template: `<div><h3>Error loading ${item.component}</h3><pre>${err.message}</pre></div>`,
        }
      }),
  )
}
</script>

<template>
  <v-container fluid class="pa-0 fill-height">
    <v-row no-gutters class="fill-height">
      <v-col cols="3" class="fill-height">
        <v-card class="fill-height">
          <v-list class="fill-height" density="comfortable">
            <v-list-subheader>Deine Pläne</v-list-subheader>

            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="openPlan(item)"
              clickable
              ripple
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-btn
            :to ="'/WorkoutView'"
          > --DEBUG-- zur Durchführen Ansicht</v-btn>
        </v-card>
      </v-col>

      <v-col cols="9" class="pa-4">
        <div v-if="!selectedComponent">
          <h2>Bitte wähle einen Plan</h2>
        </div>

        <component v-else :is="selectedComponent" :plan-name="selectedPlanName" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
