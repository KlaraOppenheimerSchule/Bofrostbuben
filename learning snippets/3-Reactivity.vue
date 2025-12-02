<script setup lang="ts">
import {reactive} from 'vue' 
import {store} from './stores/store.ts'

/* Aus der Vue Docu: 
There is another way to declare reactive state, with the reactive() API.
Unlike a ref which wraps the inner value in a special object,
reactive() makes an object itself reactive: */ 

/*
If you have a piece of state that should be shared by multiple instances,
you can use reactive() to create a reactive object, and then import it into multiple components:

example:
declare a store.ts file in/stores:

import { reactive } from 'vue'

export const store = reactive({
  count: 0
})

Then in your components, you can import and use the store:

import { store } from './store'
Now, any changes to store.count will be reactive across all components that use it.

While this works in simple cases, global state that can be arbitrarily mutated
by any component is not going to be very maintainable in the long run.
To ensure the state-mutating logic is centralized like the state itself,
it is recommended to define methods on the store with names that express the intention of the actions:
*/
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


<p> Count: {{ store.count }}</p>
 <button @click="store.increment()"> increment </button>

</template>

<style scoped></style>
