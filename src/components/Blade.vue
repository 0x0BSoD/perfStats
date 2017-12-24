<template lang="html">
    <v-layout row wrap>
      <v-flex xs12 mb-2>
        <v-card class="chart_cpu">
            <v-card-title primary-title>
              <div>
                <div class="headline">CPU</div>
                <span class="grey--text">Average Usage by vbuilder</span>
              </div>
            </v-card-title>
            <v-card-text>
                <line-chart-blade
                :data="data"
                :legend="legend"
                counter="cpu">
              </line-chart-blade>
            </v-card-text>
            <v-card-actions>
              <v-tooltip bottom>
                <v-btn color="primary" slot="activator" flat icon @click="toggle('chart_cpu')">
                  <v-icon>{{fullscreen ? 'fullscreen_exit' : 'fullscreen'}}</v-icon>
                </v-btn>
                <span>Toggle Fullscreen</span>
              </v-tooltip>
            </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 mb-2>
        <v-card class="chart_mem">
          <v-card-title primary-title>
            <div>
              <div class="headline">Memory</div>
              <span class="grey--text">Average Usage by vbuilder</span>
            </div>
          </v-card-title>
          <v-card-text>
              <line-chart-blade
              :data="data"
              :legend="legend"
              counter="mem">
            </line-chart-blade>
          </v-card-text>
          <v-card-actions>
            <v-tooltip bottom>
              <v-btn color="primary" slot="activator" flat icon @click="toggle('chart_mem')">
                <v-icon>{{fullscreen ? 'fullscreen_exit' : 'fullscreen'}}</v-icon>
              </v-btn>
              <span>Toggle Fullscreen</span>
            </v-tooltip>
            </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card class="chart_av">
          <v-card-title primary-title>
            <div>
              <div class="headline">Average</div>
              <span class="grey--text">Average Usage CPU and RAM by all vbuilders</span>
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
import LineChart from '@/components/charts/LineChart'
import LineChartBlade from '@/components/charts/LineChartBlade'
export default {
  data () {
    return {
      fullscreen: false
    }
  },
  components: {
    LineChart,
    LineChartBlade
  },
  props: {
    data: {
      type: Array | Object,
      required: true
    },
    legend: {
      type: Boolean,
      required: false
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
  .wrapper {
    position: relative;
    height: 400px;
    .chart-container {
      height: 100%;
      width: 100%;
    }
    .btn-map-fullscreen {
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 36px;
      height: 36px;
      padding: 0;
      font-size: 36px;
      line-height: 36px;
      text-align: center;
      outline: none;
    }
    &.fullscreen {
      display: flex;
      justify-content: center;
      align-items: center;
      .chart-container {
        height: 60%;
        width: 60%;
      }
      .btn-map-fullscreen {
        left: 10px;
        top: 10px;
        right: auto;
        bottom: auto;
      }
    }
  }
</style>
