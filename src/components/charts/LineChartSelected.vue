<script>
  import { Line } from 'vue-chartjs'

  export default Line.extend({
    props: {
      data: {
        type: Array | Object,
        required: true
      },
      labels: {
        type: Array | Object,
        required: true
      },
      legend: {
        type: Boolean,
        required: false
      }
    },
    data () {
      return {
        showLegend: false,
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                max: 100,
                callback: (value, index, values) => {
                  return this.formatNumber(value)
                }
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              ticks: {
                callback: (value, index, values) => {
                  return index % 10 === 0 ? value : ''
                }
              },
              display: true,
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: this.legend
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      let genDatasets = []
      let count = 0
      for (let item in this.data) {
        let thisItem = this.data[item]
        let cpuColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
        let memColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
        genDatasets[count] = {
          label: `CPU ${item}`,
          borderColor: cpuColor,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          radius: 0.5,
          pointBorderColor: cpuColor,
          backgroundColor: cpuColor,
          data: thisItem.cpu
        }
        genDatasets[count + 1] = {
          label: `MEM ${item}`,
          borderColor: memColor,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          radius: 2,
          pointBorderColor: memColor,
          backgroundColor: memColor,
          data: thisItem.mem
        }
        count += 2
      }
      this.renderChart({
        labels: this.labels,
        datasets: genDatasets
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
