<template>
  <v-toolbar fixed app>
    <v-btn round fab flat color="primary" @click="serchBy = !serchBy">{{serchByText}}</v-btn>
    <v-toolbar-items>
            <!-- <v-switch slot="activator" mt-1 v-model="serchBy" /> -->
      <v-select
        v-if="serchBy"
        min-width=100
        min-height=400
        :items="selectList"
        @keyup.enter="showChart"
        v-model="selected"
        :label="serchByText +' name'"
        multiple
        autocomplete
      ></v-select>

      <v-select
        v-if="!serchBy"
        :items="selectList"
        @keyup.enter="showChart"
        v-model="selected"
        :label="serchByText +' name'"
        bottom
        autocomplete
      ></v-select>

      <v-btn flat color="primary" v-if="serchBy" @click="showChart" :disabled="searchDisabled">Show</v-btn>
      <v-btn flat color="primary" @click="showBlade">All Blade</v-btn>


    </v-toolbar-items>

    <v-spacer></v-spacer>
    <v-toolbar-items>
    </v-toolbar-items>
      <v-btn-toggle mandatory v-model="period" class="grey lighten-4">
              <!-- <v-btn flat value="30m">
                30 M
              </v-btn> -->
              <v-btn flat value="1h">
                1 H
              </v-btn>
              <v-btn flat value="4h">
                4 H
              </v-btn>
              <v-btn flat value="6h">
                6 H
              </v-btn>
              <v-btn flat value="10h">
                10 H
              </v-btn>
              <v-btn flat value="1d">
                24 H
              </v-btn>
              <!-- <v-btn flat value="3d">
                3 D
              </v-btn> -->
            </v-btn-toggle>
    <v-btn color="primary" flat icon dark @click.native="showSelector = !showSelector"><v-icon>date_range</v-icon></v-btn>
    <!-- <Datepicker v-if="showSelector" v-model="periodS" type="datetime" lang="ru" format="yyyy-MM-dd HH:mm:ss"></Datepicker> -->
    <!-- <Datepicker v-if="showSelector" v-model="periodE" type="datetime" lang="ru" format="yyyy-MM-dd HH:mm:ss"></Datepicker> -->
    <Datepicker v-if="showSelector" v-model="selPeriod" type="datetime" lang="eng" range :shortcuts="false" confirm format="yyyy-MM-dd HH:mm:ss" ></Datepicker>

    <!-- <v-tooltip bottom>
      <v-btn slot="activator" flat icon dark color="error" @click="resetState"><v-icon>cancel</v-icon></v-btn>
      <span>Reset</span>
    </v-tooltip> -->
  </v-toolbar>

</template>

<script>
  import Datepicker from 'vue2-datepicker'
  import chs from '@/services/ChartsServices'
  export default {
    data () {
      return {
        period: '1h',
        selPeriod: null,
        periodS: null,
        periodE: new Date(),
        showSelector: false,
        serchBy: true,
        serchByText: 'VM',
        selectList: [],
        searchDisabled: true,
        vms: [],
        vms_hash: {},
        selected: null,
        hosts: [],
        hosts_hash: {},
        myQuery: {
          byWhat: 'VM',
          multi: 'false',
          start: null,
          end: new Date(),
          who: null
        }
      }
    },
    async mounted () {
      // get one day period
      let d = new Date(this.periodE)
      d.setHours(d.getHours() - 1)
      this.periodS = d

      // get list of the vms
      let response = (await chs.getVMsList()).data
      response.forEach(item => { this.vms_hash[item.vm_name] = item.id })
      this.$store.dispatch('setVmHash', this.vms_hash)
      this.vms = response.map(entry => entry.vm_name)
      this.selectList = this.vms

      // get list of the hosts
      response = (await chs.getHostsList()).data
      response.forEach(item => { this.hosts_hash[item.hostname] = item.id })
      this.$store.dispatch('setHostHash', this.hosts_hash)
      this.hosts = response.map(entry => entry.hostname)
    },
    components: {
      Datepicker
    },
    methods: {
      setPeriod (p) {
        let d = new Date(this.periodE)
        switch (p) {
          case '30m':
            d.setMinutes(d.getMinutes() - 30)
            this.periodS = d
            break
          case '1h':
            d.setHours(d.getHours() - 1)
            this.periodS = d
            break
          case '4h':
            d.setHours(d.getHours() - 4)
            this.periodS = d
            break
          case '6h':
            d.setHours(d.getHours() - 6)
            this.periodS = d
            break
          case '10h':
            d.setHours(d.getHours() - 10)
            this.periodS = d
            break
          case '1d':
            d.setDate(d.getDate() - 1)
            this.periodS = d
            break
          case '3d':
            d.setDate(d.getDate() - 3)
            this.periodS = d
            break
        }
      },
      showBlade () {
        this.myQuery.who = 'blade'
        this.myQuery.byWhat = 'blade'
        this.myQuery.multi = true
        this.selected = []
        let copy = Object.assign({}, this.myQuery)
        this.$store.dispatch('setQuery', copy)
        // this.serchByText = 'VM'
        // this.serchBy = true
      },
      showChart () {
        this.myQuery.byWhat = this.serchByText
        let copy = Object.assign({}, this.myQuery)
        this.$store.dispatch('setQuery', copy)
        this.$store.dispatch('checkClicked', 'show')
      }
    },
    watch: {
      period (e) {
        this.setPeriod(e)
      },
      selPeriod (e) {
        this.periodS = this.selPeriod[0]
        this.periodE = this.selPeriod[1]
        this.showSelector = false
      },
      periodS (e) {
        this.myQuery.start = this.periodS
        let copy = Object.assign({}, this.myQuery)
        this.$store.dispatch('setQuery', copy)
        this.$store.dispatch('setTime', this.periodS)
      },
      periodE (e) {
        this.myQuery.end = this.periodE
        let copy = Object.assign({}, this.myQuery)
        this.$store.dispatch('setQuery', copy)
        this.$store.dispatch('setTime', this.periodE)
      },
      serchBy (e) {
        this.myQuery.who = null

        let copy = Object.assign({}, this.myQuery)
        this.$store.dispatch('setQuery', copy)
        if (e) {
          this.serchByText = 'VM'
          this.selectList = this.vms
        } else {
          this.serchByText = 'Host'
          this.selectList = this.hosts
        }
        this.myQuery.byWhat = this.serchByText
        copy = Object.assign({}, this.myQuery)
        this.$store.dispatch('setQuery', copy)
      },
      selected (e) {
        if (this.myQuery.who !== 'blade') {
          this.myQuery.byWhat = this.serchByText
        }
        if (e.length !== 0) {
          this.searchDisabled = false
          this.myQuery.multi = e.length !== 1
          this.myQuery.who = e
          let copy = Object.assign({}, this.myQuery)
          this.$store.dispatch('setQuery', copy)
        } else {
          this.searchDisabled = true
        }
      }
    }
  }
</script>

<style lang="scss">
  // @import "../../assets/styles/_variables.scss";
</style>
