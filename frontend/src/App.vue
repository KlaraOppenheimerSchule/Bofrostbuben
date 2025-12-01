<script setup lang="ts">
async function getFact(): Promise<any> {
  let person: number = Math.floor(Math.random() * 83) + 1

  const data = await fetch('https://swapi.dev/api/people/' + person)

  const fact = await data.json()

  const factElement = document.getElementById('fact')
  if (factElement) {
    factElement.innerHTML = fact.name
  }
}
</script>

<template>
  <h1>You did it!</h1>
  <button @click="getFact">Generate star wars name</button>
  <p id="fact"></p>
</template>

<style scoped></style>
