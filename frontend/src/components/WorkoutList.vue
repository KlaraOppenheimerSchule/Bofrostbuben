<script setup>
import { ref } from 'vue'
import PlanViewer from '@/components/Plan.vue'

const items = [
  { text: 'Plan 1', json: '/data/Plan1.json' },
  { text: 'Plan 2', json: '/data/Plan2.json' },
  { text: 'Plan hinzufügen', json: null },
]

const selected = ref(null)

function openPlan(item) {
  if (!item || !item.json) {
    // handle "add plan" or missing JSON
    selected.value = null
    return
  }
  console.log('openPlan', item)
  selected.value = item
}
</script>

<template>
  <v-container fluid class="pa-0 fill-height">
    <v-row no-gutters class="fill-height">
      <!-- LEFT: list -->
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
        </v-card>
      </v-col>

      <!-- RIGHT: viewer -->
      <v-col cols="9" class="pa-4">
        <div v-if="!selected">
          <h2>Bitte wähle einen Plan</h2>
        </div>

        <PlanViewer
          v-else
          :json-path="selected.json"
          :plan-name="selected.text"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-list-item { cursor: pointer; }
</style>
