<script setup lang="ts">
import {ref} from 'vue' 
//Was Ref macht wird in 3. tiefer erklärt, kurzgesagt: es macht Werte reaktiv

const name = ref('This is from the "name" variable')
const href = ref("www.google.com")
const disabled = ref(true)

</script>

<template>
  #Syntax zum Einsetzen einer Variable (Das nennt sich mustache-syntax(SEHR WICHTIG))
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
