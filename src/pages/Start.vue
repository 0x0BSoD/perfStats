<template>
  <v-layout row wrap align-center>
    <v-flex v-if="loading" xs12 class="text-xs-center">
      🐧  Building Charts ...
    </v-flex>
    <v-flex v-if="loading" xs12 class="text-xs-center">
      <AtomSpinner />
    </v-flex>
        <v-expansion-panel v-if="show != 'blade' && show == 'host' && loaded">
          <v-expansion-panel-content>
            <div slot="header">{{findConf.cpu}}</div>
            <v-card>
              <v-card-text class="grey lighten-4">
                <v-list two-line class="grey lighten-4">
                  <template>

                    <v-list-tile  avatar ripple>
                      <v-list-tile-content>
                      <v-list-tile-title>CPU Frequency</v-list-tile-title>
                      <v-list-tile-sub-title class="grey--text text--darken-4">{{findConf.cpuFrequency}}Mhz</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile avatar ripple>
                      <v-list-tile-content>
                      <v-list-tile-title>CPU Cores</v-list-tile-title>
                      <v-list-tile-sub-title class="grey--text text--darken-4">{{findConf.cpuCores}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile avatar ripple>
                      <v-list-tile-content>
                      <v-list-tile-title>CPU Packages</v-list-tile-title>
                      <v-list-tile-sub-title class="grey--text text--darken-4">{{findConf.cpuPackages}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile avatar ripple>
                      <v-list-tile-content>
                      <v-list-tile-title>RAM</v-list-tile-title>
                      <v-list-tile-sub-title class="grey--text text--darken-4">{{findConf.ramSize}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile avatar ripple>
                      <v-list-tile-content>
                      <v-list-tile-title>MotherBoard</v-list-tile-title>
                      <v-list-tile-sub-title class="grey--text text--darken-4">{{findConf.mbVendor}}</v-list-tile-sub-title>
                      <v-list-tile-sub-title>{{findConf.mbModel}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile avatar ripple>
                      <v-list-tile-content>
                      <v-list-tile-title>ESXi Version</v-list-tile-title>
                      <v-list-tile-sub-title class="grey--text text--darken-4">{{findConf.hostOS}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>

                  </template>
                </v-list>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel v-if="show != 'blade' && show == 'VM' && loaded">
          <v-expansion-panel-content>
            <div slot="header">{{findConf.vm_name}}</div>
            <v-card>
              <v-card-text class="grey lighten-4">
                <v-list two-line class="grey lighten-4">
                  <template>

                    <v-list-tile  avatar ripple>
                      <v-list-tile-content>
                        <v-list-tile-title>CPU's</v-list-tile-title>
                        <v-list-tile-sub-title class="grey--text text--darken-4">{{findConf.cpus}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile  avatar ripple>
                      <v-list-tile-content>
                      <v-list-tile-title>CPU Cores On Socket</v-list-tile-title>
                      <v-list-tile-sub-title class="grey--text text--darken-4">{{findConf.coresOnSocket}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile  avatar ripple>
                      <v-list-tile-content>
                      <v-list-tile-title>RAM</v-list-tile-title>
                      <v-list-tile-sub-title class="grey--text text--darken-4">{{findConf.ram}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile  avatar ripple>
                      <v-list-tile-content>
                      <v-list-tile-title>Guest OS</v-list-tile-title>
                      <v-list-tile-sub-title class="grey--text text--darken-4">{{findConf.guest_os}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile  avatar ripple>
                      <v-list-tile-content>
                      <v-list-tile-title>Disks</v-list-tile-title>
                      <!-- <v-list-tile-sub-title class="grey--text text--darken-4">
                      </v-list-tile-sub-title> -->
                      <div v-for="i in JSON.parse((findConf.disks).replace(/\\/g,'\\\\'))">
                        <v-chip label color="secondary" text-color="white">Drive: </v-chip>
                        <v-chip label>{{i.path}}</v-chip>
                        <v-chip label color="secondary" text-color="white">Capacity: </v-chip>
                        <v-chip label>{{i.capacity}}</v-chip>
                        <v-chip label color="secondary" text-color="white">Free Space: </v-chip>
                        <v-chip label>{{i.freeSpace}}</v-chip>
                      </div>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile  avatar ripple>
                      <v-list-tile-content>
                      <v-list-tile-title>NIC's</v-list-tile-title>
                      <v-list-tile-sub-title class="grey--text text--darken-4">
                      </v-list-tile-sub-title>
                      <div v-for="i in JSON.parse((findConf.nicInfo).replace(/\\/g,'\\\\'))">
                        <div  v-if="!!i.ip[0]">
                          <v-chip v-if='' label color="secondary" text-color="white">IP: </v-chip>
                          <v-chip label v-if="(i.ip[0]).includes('::')">{{i.ip[1]}}</v-chip>
                          <v-chip label v-else>{{i.ip[0]}}</v-chip>
                          <v-chip label color="secondary" text-color="white">MAC: </v-chip>
                          <v-chip label>{{i.mac}}</v-chip>
                        </div>
                      </div>
                      </v-list-tile-content>
                    </v-list-tile>

                  </template>
                </v-list>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <ChartbyVM :data="fetchedData"  v-if="show == 'VM'"/>
        <ChartbyVMs :data="fetchedData"  v-if="show == 'VMs'"/>
        <ChartbyHost :data="fetchedData" v-if="show == 'host'"/>
        <ChartBlade :data="fetchedData" v-if="show == 'blade'"/>
      <v-alert color="error" icon="warning" v-if="showError" value="showError">
        {{ errorMessage }}
      </v-alert>
  </v-layout>
</template>

<script>
  import chs from '@/services/ChartsServices'

  import Datepicker from 'vue2-datepicker'
  import {mapState} from 'vuex'
  import { AtomSpinner } from 'epic-spinners'

  import ChartbyVM from '@/components/VM'
  import ChartbyVMs from '@/components/VMs'
  import ChartbyHost from '@/components/Host'
  import ChartBlade from '@/components/Blade'
  import { dateLabelsToHoursList } from '@/utils/dateFormatter'
  import { calc } from '@/utils/bladeAverage'

  export default {
    computed: {
      ...mapState([
        'vmsHash',
        'hostsHash',
        'query',
        'time',
        'clicked'
      ])
    },
    components: {
      AtomSpinner,
      Datepicker,
      ChartbyVM,
      ChartbyVMs,
      ChartbyHost,
      ChartBlade
    },
    metaInfo: {
      title: '📈 vm-stats',
      titleTemplate: '%s',
      meta: {
        description: ''
      }
    },
    data () {
      return {
        // avShow: false,
        vm: null,
        findConf: null,
        host: null,
        multi: false,
        serchBy: true,
        loaded: false,
        loading: false,
        fetchedData: {},
        multiData: {},
        getHostData: {},
        labels: [],
        showError: false,
        showSelector: false,
        errorMessage: 'Name not valid or data set empty',
        showLegend: false,
        periodStart: null,
        periodEnd: null,
        selectDiff: false,
        show: null
      }
    },
    async mounted () {
    },
    methods: {
      resetState () {
        this.loaded = false
        this.showError = false
        this.multi = false
        this.show = null
        this.fetchedData = {}
      },
      /* #================= One VM =========================================# */
      async requestOneVMData () {
        if (this.query.who === null || this.query.who === '' || this.query.who === 'undefined') {
          this.showError = true
          return
        }
        this.resetState()
        this.loading = true
        this.multi = false
        try {
          /* #=== Fetch Config of the VM ===# */
          this.findConf = (await chs.getVMConf(this.vmsHash[this.query.who])).data[0]
          console.log(this.findConf)
          /* #=== Fetch VM Data ===# */
          this.fetchedData = (await chs.getVMData(this.vmsHash[this.query.who],
                                                  this.query.start,
                                                  this.query.end)).data
          this.fetchedData.labels = await dateLabelsToHoursList(this.fetchedData.labels)
          this.loaded = true
          this.loading = false
          this.show = 'VM'
        } catch (err) {
          this.resetState()
          this.errorMessage = 'Error in "requestOneVMData"'
          console.error(err)
          this.showError = true
          this.loading = false
          return
        }
      },
      /* #================= Many VM ========================================# */
      async requestVMsData () {
        if (this.query.who === null || this.query.who === '' || this.query.who === 'undefined') {
          this.showError = true
          return
        }
        this.resetState()
        this.loading = true
        this.multi = true
        try {
          /* #=== Fetch VMs Data ===# */
          let vmIds = this.query.who.map(each => this.vmsHash[each])
          this.fetchedData.data = (await chs.postMultiple(vmIds,
                                                  this.query.start,
                                                  this.query.end)).data
          this.fetchedData.average = calc(this.fetchedData.data)
          this.fetchedData.labels = dateLabelsToHoursList(this.fetchedData.data[Object.keys(this.fetchedData.data)[0]].labels)
          this.loaded = true
          this.loading = false
          this.show = 'VMs'
        } catch (err) {
          this.resetState()
          this.errorMessage = 'Error in "requestVMsData"'
          console.error(err)
          this.showError = true
          this.loading = false
          return
        }
      },
      /* #================= On Host=========================================# */
      async requestHostData () {
        if (this.query.who === null || this.query.who === '' || this.query.who === 'undefined') {
          this.showError = true
          return
        }
        this.resetState()
        this.loading = true
        this.multi = false
        try {
          /* #=== Fetch Config of the VM ===# */
          this.findConf = (await chs.getHostConf(this.hostsHash[this.query.who])).data[0]
          /* #=== Fetch Host Data ===# */
          this.fetchedData.data = (await chs.getHostData(this.hostsHash[this.query.who],
                                                  this.query.start,
                                                  this.query.end)).data
          this.fetchedData.labels = dateLabelsToHoursList(this.fetchedData.data[Object.keys(this.fetchedData.data)[0]].labels)
          this.loaded = true
          this.loading = false
          this.show = 'host'
        } catch (err) {
          this.resetState()
          this.errorMessage = 'Error in "requestHostData"'
          console.error(err)
          this.showError = true
          this.loading = false
          return
        }
      },
      /* #================= Blade ==========================================# */
      async requestBladeData () {
        if (this.query.who === null || this.query.who === '' || this.query.who === 'undefined') {
          this.showError = true
          return
        }
        this.resetState()
        this.loading = true
        this.multi = false
        try {
          this.fetchedData.data = (await chs.getBladeData(this.query.start,
                                                          this.query.end)).data
          // this.fetchedData.data = (await chs.getBladeDataAverage(this.query.start,
          //                                                 this.query.end)).data
          this.fetchedData.average = calc(this.fetchedData.data)
          this.fetchedData.labels = dateLabelsToHoursList(this.fetchedData.data[Object.keys(this.fetchedData.data)[0]].labels)
          this.loaded = true
          this.loading = false
          this.show = 'blade'
        } catch (err) {
          this.resetState()
          this.errorMessage = 'Error in "requestBladeData"'
          console.error(err)
          this.showError = true
          this.loading = false
          return
        }
      }
    },
    watch: {
      clicked () {
        if (this.clicked === 'show') {
          this.resetState()
          if (this.query.byWhat === 'VM') {
            this.serchBy = true
            this.query.multi ? this.requestVMsData() : this.requestOneVMData()
          } else if (this.query.byWhat === 'Host') {
            this.serchBy = false
            this.requestHostData()
          }
        }
        this.$store.dispatch('checkClicked', 'notShow')
      },
      query () {
        if (this.query.who) {
          if (this.query.byWhat === 'Host') {
            this.resetState()
            this.requestHostData()
          }
          if (this.query.byWhat === 'blade' && this.query.who === 'blade') {
            this.resetState()
            this.requestBladeData()
          }
        }
      },
      time () {
        if (this.query.byWhat === 'VM' && this.query.who) {
          this.query.multi ? this.requestVMsData() : this.requestOneVMData()
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/styles/_variables.scss";
  @import "./Start_style.scss";
  .atom-spinner {
    margin: 0 auto;
  }
</style>
