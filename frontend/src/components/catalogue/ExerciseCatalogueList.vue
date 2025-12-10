<script setup lang="ts">

const itemPlaceholders = [
  {
    title: 'Liegestützen',
    subtitle: 'Muskelgruppe 1',
  },
  { type: 'divider', inset: true },
  {
    title: 'Situps',
    subtitle: 'Muskelgruppe 2',
  },
  { type: 'divider', inset: true },
  {
    title: 'Benchpress',
    subtitle: 'Muskelgruppe 3',
  },
]

</script>

<template>
  <v-container class="mx-auto">
    <v-list :items="itemPlaceholders" lines="two" item-props>
      <template v-slot:subtitle="{ subtitle }">
        <div v-html="subtitle"></div>
      </template>

      <template v-slot:append>
        <v-icon>mdi-arrow-right</v-icon>
      </template>
    </v-list>
  </v-container>
</template>
