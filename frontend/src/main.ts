import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'unfonts.css' // Vuetify fonts
import '@mdi/font/css/materialdesignicons.css' // load MDI font CSS

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // use mdi as the default icon set
  },
    theme: {
    defaultTheme: 'appTheme',
    themes: {
      appTheme: {
        colors: {
          primary: '#710002',   // Change this
          secondary: '#710002',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5252',
        },
      },
    },
  },
})


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
