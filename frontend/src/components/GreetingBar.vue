<script setup lang="ts">
import { ref } from 'vue'

const names = ['Benjamin Nethanyahu', 'Charlie', 'Fortnite', 'SixSeven']
const UserName = ref(names[Math.floor(Math.random() * names.length)])

function changeToProfile() {
  console.log('route to profile')
}
</script>

<template>
  <p>
    <button @click="changeToProfile">
      <img src="../../public/assets/placeholderProfile.jpg" alt="Logo" style="" />
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
