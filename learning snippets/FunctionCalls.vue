<script setup lang="ts">
import {ref} from 'vue' 

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
