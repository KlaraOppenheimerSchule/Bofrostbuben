<script setup lang="ts">
import {ref} from 'vue' //ref gibt "reaktive strings" zurück, die Vue.JS erkennt und ihren Wert bei Änderung automatisch übernimmt

const name = ref('This is from the "name" variable')
const href = ref("www.google.com")
const disabled = ref(true)
</script>

<template>
  #Syntax zum Einsetzen einer Variable 
  <p> {{ name }}</p>
  <br></br>
  #Syntax zum Einsetzen von Attributen, die  '{ { } }' syntax, kann nicht für HTML Attribute verwendet werden
  <a v-bind:href="href"> 
    <button> click here to</button>
  </a>
  <br></br>

  #Shorthandsyntax zum Einsetzen von Attributen
  <a :href="href"> 
    <button> click here to</button>
  </a>
  <br></br>

  #Shorthandsyntax zum Einsetzen von Attributen, die genauso heißen wie die Variablen
  <a :href> 
    <button :disabled> click here to</button>
  </a>
  <br></br>

</template>

<style scoped></style>
