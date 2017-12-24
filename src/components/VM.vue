\<template lang="html">
    <v-layout mt-5 row wrap>
      <!-- ========= CPU MEM ========= -->
      <v-flex xs12 mb-4>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">CPU, RAM</div>
              <span class="grey--text">Average Usage in Percentage</span>
            </div>
          </v-card-title>
          <v-card-text>
              <line-chart
              title-one="CPU Usage"
              :chart-data-one="cpu"
              title-second="Memory Usage"
              :chart-data-second="mem"
              :chart-labels="labels"
              :chart-max="100">
              </line-chart>
          </v-card-text>
        </v-card>
      </v-flex>
      <!-- ========= DISK ========= -->
      <v-flex xs12 mb-4>
              <v-card>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">Disk I/O</div>
                    <span class="grey--text">Average Usage in IOPS</span>
                  </div>
                </v-card-title>
                <v-card-text>
              <line-chart
              title-one="Input"
              :chart-data-one="disk_i"
              title-second="Output"
              :chart-data-second="disk_o"
              :chart-labels="labels">
              </line-chart>
            </v-card-text>
          </v-card>
      </v-flex>
      <!-- ========= NET ========= -->
      <v-flex xs12 mb-4>
            <v-card>
              <v-card-title primary-title>
                <div>
                  <div class="headline">Network I/O</div>
                  <span class="grey--text">Average Usage in Mbps</span>
                </div>
              </v-card-title>
              <v-card-text>
            <line-chart
            title-one="Input"
            :chart-data-one="net_i"
            title-second="Output"
            :chart-data-second="net_o"
            :chart-labels="labels">
            </line-chart>
          </v-card-text>
        </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import LineChart from '@/components/charts/LineChart'
export default {
  components: { LineChart },
  props: {
    data: {
      type: Array | Object,
      required: true
    }
  },
  data () {
    return {
      cpu: this.data.cpu,
      mem: this.data.mem,
      disk_i: this.data.disk_i,
      disk_o: this.data.disk_o,
      net_i: this.data.net_i,
      net_o: this.data.net_o,
      labels: this.data.labels
    }
  }
}
</script>

<style lang="scss">
</style>
