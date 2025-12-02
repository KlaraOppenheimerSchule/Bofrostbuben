<template>
  <nav class="bottom-nav">
    <RouterLink to="/HomeView" class="nav-btn">
      <img :src="homeIcon" class="nav-icon" />
    </RouterLink>

    <RouterLink to="/ProfileView" class="nav-btn">
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

<script setup>
import homeIcon from '@/../media/home.svg'
import catalogIcon from '@/../media/catalog.svg'
import newPlanIcon from '@/../media/newPlan.svg'
import historyIcon from '@/../media/history.svg'
import settingsIcon from '@/../media/settings.svg'
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  background: #710002;
  display: flex;
  justify-content: center;
  gap: 12px;
  border-radius: 40px;
  width: max-content;
}

.nav-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-btn:hover {
  background: rgba(255,255,255,0.2);
}

.nav-btn:active {
  background: rgba(255,255,255,0.05);
}

.nav-icon {
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
}
</style>
