<script setup lang="ts">
import { store } from '@/stores/color_store'

defineProps<{
  title1: string
  title2: string
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <button class="btn-template" @click="emit('click')">
    <span>{{ title1 }}</span>
    <span v-if="title2">{{ title2 }}</span>
  </button>
</template>

<style scoped>
.btn-template {
  border: none;
  color: white;
  background: v-bind('store.mainAppColor');
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 12rem;
  border-radius: 1.2rem;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
