<script setup lang="ts">
import { ref } from 'vue'
const names = ['Benjamin Nethanyahu', 'Charlie', 'Fortnite', 'SixSeven']
const UserName = ref(names[Math.floor(Math.random() * names.length)])

function profile() {
  console.log("route to profile")
}
</script>

<template>
  <button @click="profile">Click me</button>
  <p>Hallo, {{ UserName }}!</p>
</template>

<style scoped>

</style>
