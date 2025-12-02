/* This snippet demonstrates a simple reactive store using Vue's reactive API.
please refer to the Reactivity.vue learning snippet for more details on reactivity in Vue 3.
*/

import { reactive } from 'vue'

export const store = reactive({
  count: 0,
  increment() {
    this.count++
    console.log('Count incremented to:', this.count)
  }
})

