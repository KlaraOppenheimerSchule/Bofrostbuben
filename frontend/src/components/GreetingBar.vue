<script setup lang="ts">
import { ref } from 'vue'

const names = ['Benjamin Nethanyahu', 'Charlie', 'Fortnite', 'SixSeven']
const UserName = ref(names[Math.floor(Math.random() * names.length)])

function changeToProfile() {
  alert('route to profile')
}
</script>

<template>
  <p style="display: flex; align-items: center; gap: 0, 5rem; margin: 0">
    <button
      @click="changeToProfile"
      style="all: unset; cursor: pointer; display: flex; align-items: center"
    >
      <img
        src="/assets/icons/muskelkater.svg"
        alt="Logo"
        style="display: block; width: 5rem; height: 5rem"
      />
    </button>

    Hallo, {{ UserName }}!
  </p>
</template>

<style scoped>
button img {
  width: 20px;
  height: 20px;
}
</style>
