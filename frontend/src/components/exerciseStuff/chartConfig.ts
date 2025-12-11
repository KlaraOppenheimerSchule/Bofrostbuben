import type { ChartData, ChartOptions } from 'chart.js'

export const data: ChartData<'line'> = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Übungen abgeschlossen',
      backgroundColor: '#f87979',
      data: [20, 6, 2, 9, 22, 18, 11]
    }
  ]
}

export const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio:  true
}
