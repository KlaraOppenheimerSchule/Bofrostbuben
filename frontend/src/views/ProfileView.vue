<script setup lang="ts">
  import { ref } from 'vue'

  const name = ref('')
  const email = ref('')
  const phone = ref('')

  const saveMessage = ref('')

  //will be an API-call in the future to save the data
  function saveProfile() {
    saveMessage.value = 'Profil wurde gespeichert.'
  }
  </script>

  <template>
    <v-container>
      <h1>Profil</h1>
      <v-form @submit.prevent="saveProfile">
        <v-text-field
          label="Name"
          v-model="name"
          type="text"
          variant="outlined"
          clearable
        />

        <v-text-field
          label="E-Mail"
          v-model="email"
          type="email"
          variant="outlined"
          clearable
        />

        <v-text-field
          label="Telefon"
          v-model="phone"
          type="text"
          variant="outlined"
          clearable
        />

        <v-btn>
          Speichern
        </v-btn>

      </v-form>

      <p v-if="saveMessage">{{ saveMessage }}</p>
    </v-container>
  </template>
