<template>
  <nav class="bottom-nav">
    <button
      v-for="btn in buttons"
      :key="btn.id"
      class="nav-btn"
      @click="handleClick(btn)"
    >
      <img :src="btn.icon" class="nav-icon" />
    </button>
  </nav>
</template>

<script setup>
const props = defineProps({})

const buttons = [
  { id: 'home', label: 'home', icon: new URL('@/../media/home.svg', import.meta.url).href },
  { id: 'catalog', label: 'catalog', icon: new URL('@/../media/catalog.svg', import.meta.url).href },
  { id: 'newPlan', label: 'newPlan', icon: new URL('@/../media/newPlan.svg', import.meta.url).href },
  { id: 'history', label: 'history', icon: new URL('@/../media/history.svg', import.meta.url).href },
  { id: 'setup', label: 'setup', icon: new URL('@/../media/settings.svg', import.meta.url).href }
]

function handleClick(btn) {
  console.log(btn.label)
  alert(btn.label)
}
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
