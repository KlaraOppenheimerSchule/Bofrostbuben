<template>
  <nav class="bottom-nav" :style="{ background: store.mainAppColor }">
    <RouterLink to="/" class="nav-btn">
      <img :src="homeIcon" class="nav-icon" />
    </RouterLink>

    <RouterLink to="/ExcerciseCatalogueView" class="nav-btn">
      <img :src="catalogIcon" class="nav-icon" />
    </RouterLink>

    <RouterLink to="/CreatePlanView" class="nav-btn">
      <img :src="newPlanIcon" class="nav-icon" />
    </RouterLink>

    <RouterLink to="/HistoryView" class="nav-btn">
      <img :src="historyIcon" class="nav-icon" />
    </RouterLink>

    <RouterLink to="/SettingsView" class="nav-btn">
      <img :src="settingsIcon" class="nav-icon" />
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { store } from '@/stores/color_store'
import homeIcon from '@/../media/home.svg'
import catalogIcon from '@/../media/catalog.svg'
import newPlanIcon from '@/../media/newPlan.svg'
import historyIcon from '@/../media/history.svg'
import settingsIcon from '@/../media/settings.svg'
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0.75rem; /* 12px */
  left: 50%;
  transform: translateX(-50%);
  padding: 0.625rem; /* 10px */
  display: flex;
  justify-content: center;
  gap: 0.75rem; /* 12px */
  border-radius: 2.5rem; /* 40px */
  width: max-content;
}

/* Buttons */
.nav-btn {
  width: 3.125rem; /* 50px */
  height: 3.125rem; /* 50px */
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-btn:active {
  background: rgba(255, 255, 255, 0.05);
}

.nav-icon {
  width: 1.5rem; /* 24px */
  height: 1.5rem; /* 24px */
  filter: brightness(0) invert(1);
}
</style>
