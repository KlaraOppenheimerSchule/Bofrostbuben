<script setup lang="ts">
import {reactive} from 'vue' 

/* Aus der Vue Docu: 
There is another way to declare reactive state, with the reactive() API.
Unlike a ref which wraps the inner value in a special object,
reactive() makes an object itself reactive: */ 

const navHome = document.getElementById('nav_home')
const navCatalog = document.getElementById('nav_catalog')
const navNewPlan = document.getElementById('nav_newPlan')
const navHistory = document.getElementById('nav_history')
const navSetup = document.getElementById('nav_setup')

navHome?.addEventListener('click', () => {
    console.log("home clicked")
})

navCatalog?.addEventListener('click', () => {
    console.log("catalog clicked")
})

navNewPlan?.addEventListener('click', () => {
    console.log("newPlan clicked")
})

navHistory?.addEventListener('click', () => {
    console.log("history clicked")
})

navSetup?.addEventListener('click', () => {
    console.log("setup clicked")
})

</script>

<template>

<div id="navigation_bar">
    <button id="nav_home">home</button>
    <button id="nav_catalog">catalog</button>
    <button id="nav_newPlan">newPlan</button>
    <button id="nav_history">history</button>
    <button id="nav_setup">setup</button>
</div>

</template>

<style scoped></style>
