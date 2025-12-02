import { reactive } from 'vue'

export const store = reactive({
  count: 0,
  increment() {
    this.count++
    console.log('Count incremented to:', this.count)
  },
})
