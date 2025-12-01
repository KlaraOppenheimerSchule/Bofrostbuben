<script setup lang="ts">
import {reactive} from 'vue' 

/* Aus der Vue Docu: 
There is another way to declare reactive state, with the reactive() API.
Unlike a ref which wraps the inner value in a special object,
reactive() makes an object itself reactive: */ 

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

</script>

<template>

<p>Has published books:</p>
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>

</template>

<style scoped></style>
