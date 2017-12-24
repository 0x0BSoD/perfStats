<template lang="html">
    <v-layout mt-5 row wrap>
      <v-flex xs12 mb-4>
        <v-card class="chart">
          <v-card-title primary-title>
            <div>
              <div class="headline">CPU, RAM</div>
              <span class="grey--text">Average Usage in Percentage</span>
            </div>
          </v-card-title>
          <v-card-text>
          <line-chart-selected
            :data="data.data"
            :labels="data.labels"
            :legend=true
            counter="cpu">
          </line-chart-selected>
          </v-card-text>
          <v-card-actions>
            <v-tooltip bottom>
              <v-btn color="primary" slot="activator" flat icon @click="toggle('chart')">
                <v-icon>{{fullscreen ? 'fullscreen_exit' : 'fullscreen'}}</v-icon>
              </v-btn>
              <span>Toggle Fullscreen</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 mb-4>
        <v-card class="chart_av">
          <v-card-title primary-title>
            <div>
              <div class="headline">Average</div>
              <span class="grey--text">Usage in Percentage</span>
            </div>
          </v-card-title>
          <v-card-text>
              <line-chart
              title-one="CPU Usage"
              :chart-data-one="data.average.cpu"
              title-second="Memory Usage"
              :chart-data-second="data.average.mem"
              :chart-labels="data.labels"
              :chart-max="100">
            </line-chart>
          </v-card-text>
          <v-card-actions>
            <v-tooltip bottom>
              <v-btn color="primary" slot="activator" flat icon @click="toggle('chart_av')">
                <v-icon>{{fullscreen ? 'fullscreen_exit' : 'fullscreen'}}</v-icon>
              </v-btn>
              <span>Toggle Fullscreen</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
import LineChartSelected from '@/components/charts/LineChartSelected'
import LineChart from '@/components/charts/LineChart'
export default {
  data () {
    return {
      legend: false,
      fullscreen: false
    }
  },
  components: {
    LineChartSelected,
    LineChart
  },
  props: {
    data: {
      type: Array | Object,
      required: true
    },
    average: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    toggle (e) {
      this.$fullscreen.toggle(this.$el.querySelector(`.${e}`), {
        wrap: false,
        fullscreenClass: 'biiig',
        callback: this.fullscreenChange
      })
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    }
  }
}
</script>

<style lang="scss">
</style>
