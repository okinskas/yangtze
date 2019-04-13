import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  name: 'HistoricalDataGraph',
  props: ['data', 'options'],

  mounted() {
    this.renderChart(this.chartData, this.options)
  },

  watch: {
    'data': {
      handler() {
        this.$data._chart.destroy()
        this.renderChart(this.data, this.options)
      }
    }
  }
}