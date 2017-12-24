<script>
  import { Line } from 'vue-chartjs'

  export default Line.extend({
    props: {
      titleOne: {
        type: String,
        required: false
      },
      chartDataOne: {
        type: Array | Object,
        required: false
      },
      titleSecond: {
        type: String,
        required: false
      },
      chartDataSecond: {
        type: Array | Object,
        required: false
      },
      chartLabels: {
        type: Array,
        required: true
      },
      chartMax: {
        type: String | Object,
        required: false
      }
    },
    data () {
      return {
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                max: this.chartMax,
                callback: (value, index, values) => {
                  return this.formatNumber(value)
                }
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              display: true,
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
      this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

      this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
      this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)')
      this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')

      this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
      this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)')
      this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)')
      this.renderChart({
        labels: this.chartLabels,
        datasets: [
          {
            label: this.titleOne,
            borderColor: '#f87979',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            radius: 0.5,
            pointBorderColor: '#f87979',
            backgroundColor: this.gradient,
            data: this.chartDataOne
          },
          {
            label: this.titleSecond,
            borderColor: '#4286f4',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            radius: 0.5,
            pointBorderColor: '#4286f4',
            backgroundColor: this.gradient2,
            data: this.chartDataSecond
          }
        ]
      }, this.options)
    },
    methods: {
      formatNumber (num) {
        let numString = Math.round(num).toString()
        let numberFormatMapping = [[6, 'm'], [3, 'k']]
        for (let [numberOfDigits, replacement] of numberFormatMapping) {
          if (numString.length > numberOfDigits) {
            let decimal = ''
            if (numString[numString.length - numberOfDigits] !== '0') {
              decimal = '.' + numString[numString.length - numberOfDigits]
            }
            numString = numString.substr(0, numString.length - numberOfDigits) + decimal + replacement
            break
          }
        }
        return numString
      }
    }
  })
</script>
