<script setup lang="ts">
import { store } from '@/stores/color_store'
</script>

<template>
  <v-bottom-navigation :elevation="6"grow>
  <v-btn 
  value="HomeView"
  :to="'/HomeView'"
  >
    <v-icon
      color="green-darken-2"
      icon="mdi-home"
      size="large"
    ></v-icon>

    <span>Home</span>
  </v-btn>

  <v-btn 
  value="ExerciseCatalogView"
  :to="'/ExerciseCatalogueView'">
    <v-icon
      color="green-darken-2"
      icon="mdi-dumbbell"
      size="large"
    ></v-icon>

    <span>Catalog</span>
  </v-btn>

  <v-btn 
  value="CreatePlanView"
  :to="'/CreatePlanView'">
    <v-icon
      color="green-darken-2"
      icon="mdi-plus"
      size="large"
    ></v-icon>

    <span>New Plan</span>
  </v-btn>

  <v-btn value="HistoryView"
  :to="'/HistoryView'">
    <v-icon
      color="green-darken-2"
      icon="mdi-calendar"
      size="large"
    ></v-icon>

    <span>History</span>
  </v-btn>

  <v-btn value="SettingsView"
  :to="'/SettingsView'">
    <v-icon
      color="green-darken-2"
      icon="mdi-cog"
      size="large"
    ></v-icon>

    <span>Settings</span>
  </v-btn>
</v-bottom-navigation>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.625rem;
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  border-radius: 2.5rem;
  width: max-content;
}

.nav-btn {
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
}

.nav-btn.active {
  background: white;
}

.nav-icon {
  width: 1.5rem;
  height: 1.5rem;
  filter: brightness(0) invert(1);
}

.nav-btn:hover {
  background-color: RGBA(255, 255, 255, 0.2);
}

.nav-btn.active .nav-icon {
  filter: v-bind('store.svgMainAppColorFilter');
}

.nav-btn.active:hover {
  background-color: white;
}
</style>
