<template lang="html">
    <v-layout mt-5 row wrap>
      <v-flex xs12 mb-4 v-for="(chart, index) in data.data" :key="index" :class="index">
        <v-card>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ index }}</div>
                <span class="grey--text">CPU and MEM in %</span>
              </div>
            </v-card-title>
            <v-card-text>
              <line-chart
              title-one="CPU Usage"
              :chart-data-one="chart.cpu"
              title-second="Memory Usage"
              :chart-data-second="chart.mem"
              :chart-labels="data.labels"
              :chart-max="100">
              </line-chart>
            </v-card-text>
            <v-card-actions>
              <v-tooltip bottom>
                <v-btn color="primary" slot="activator" flat icon @click="toggle(index)">
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
export default {
  data () {
    return {
      fullscreen: false
    }
  },
  components: { LineChart },
  props: {
    data: {
      type: Array | Object,
      required: true
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
