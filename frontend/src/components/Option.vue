<script setup lang="ts">
const items = [{ text: 'Sprache' }, { text: 'Layout' }, { text: 'Impressum' }]
</script>

<template>
  <v-card class="mx-auto" max-width="300">
    <v-list density="compact">
      <v-list-subheader>Einstellungen</v-list-subheader>
      <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary">
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>
