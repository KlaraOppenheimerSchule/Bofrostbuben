<script setup lang="ts">
import { ref } from 'vue'

const names = ['Benjamin Nethanyahu', 'Charlie', 'Fortnite', 'SixSeven']
const UserName = ref(names[Math.floor(Math.random() * names.length)])

</script>

<template>
  <div class="greeting-container">
    <RouterLink to="/ProfileView" class="link-no-decoration">
      <button class="icon-button">
        <img src="/assets/icons/muskelkater.svg" alt="Logo" class="icon-img" />
      </button>
    </RouterLink>
    Hallo, {{ UserName }}!
  </div>
</template>

<style scoped>
.greeting-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}

.icon-button {
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.icon-img {
  display: block;
  width: 5rem;
  height: 5rem;
}
</style>
