<script setup lang="ts">
import {ref} from 'vue' 
// ref for reactive variable 
// the difference between ref and reactive is that ref is for primitive types like number,string,boolean
// where as reactive is for objects and arrays
const count = ref(0)

function increment():void {
    count.value++
}
</script>

<template>

<p> the count is: {{ count }}</p>
<button @click="increment">click to increment </button>

</template>

<style scoped></style>
