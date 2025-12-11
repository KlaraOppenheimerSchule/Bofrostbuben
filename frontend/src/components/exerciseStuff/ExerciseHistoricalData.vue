<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'
import { Line } from 'vue-chartjs'
import * as chartConfig from './chartConfig'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// Type-safe destructuring of chart config
const { data, options } = chartConfig as {
  data: ChartData<'line'>
  options: ChartOptions<'line'>
}
</script>

<template>
  <Line :data="data" :options="options" />
</template>
