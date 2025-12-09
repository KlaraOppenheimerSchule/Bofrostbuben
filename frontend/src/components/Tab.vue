<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const items = ['Übungsübersicht', 'Übungshistorie']

const tab = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

</script>

<template>
  <v-card color="basil">
    <v-tabs v-model="tab" color="basil" grow>
      <v-tab v-for="item in items" :key="item" :text="item" :value="item"></v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="item in items" :key="item" :value="item">
        <v-card color="basil" flat>

        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<style></style>
