<script setup lang="ts">
import { store } from '@/stores/color_store'
import homeIcon from '/assets/icons/home.svg'
import catalogIcon from '/assets/icons/dumbbell.svg'
import newPlanIcon from '/assets/icons/plus.svg'
import historyIcon from '/assets/icons/calendar.svg'
import settingsIcon from '/assets/icons/settings.svg'
</script>

<template>
  <nav class="bottom-nav" :style="{ background: store.mainAppColor }">
    <RouterLink to="/HomeView" v-slot="{ isActive }">
      <button class="nav-btn" :class="{ active: isActive }">
        <img :src="homeIcon" class="nav-icon" />
      </button>
    </RouterLink>

    <RouterLink to="/ExerciseCatalogueView" v-slot="{ isActive }">
      <button class="nav-btn" :class="{ active: isActive }">
        <img :src="catalogIcon" class="nav-icon" />
      </button>
    </RouterLink>

    <RouterLink to="/CreatePlanView" v-slot="{ isActive }">
      <button class="nav-btn" :class="{ active: isActive }">
        <img :src="newPlanIcon" class="nav-icon" />
      </button>
    </RouterLink>

    <RouterLink to="/HistoryView" v-slot="{ isActive }">
      <button class="nav-btn" :class="{ active: isActive }">
        <img :src="historyIcon" class="nav-icon" />
      </button>
    </RouterLink>

    <RouterLink to="/SettingsView" v-slot="{ isActive }">
      <button class="nav-btn" :class="{ active: isActive }">
        <img :src="settingsIcon" class="nav-icon" />
      </button>
    </RouterLink>
  </nav>
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
