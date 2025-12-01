<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

/* Einfache Operationen wie einen Ternary ins Template zu schreiben kann zweckmäßig sein,
allerdings sollte man Logik, Template und Styling wo immer möglich voneinander trennen,
hierzu gibt es sogenannte computed properties */ 

const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>