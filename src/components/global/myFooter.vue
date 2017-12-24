<template>
  <v-footer class="pa-3" app>
    <span v-if="!query.who"> Build with <a href="https://vuejs.org/">Vue.js</a> and <a href="http://vue-chartjs.org/#/">vue-chartjs</a></span>
    <div v-if="query.who">Start<v-chip label>{{start}}</v-chip> Stop<v-chip label>{{stop}}</v-chip></div>
    <v-spacer></v-spacer>
    <span>&copy; 2017 | ver. 1.0.6</span>
  </v-footer>
</template>

<script>
  import {mapState} from 'vuex'
  import { dateToMySQL } from '@/utils/dateFormatter'
  export default {
    data () {
      return {
        start: null,
        stop: null
      }
    },
    computed: {
      ...mapState([
        'query'
      ])
    },
    watch: {
      query () {
        this.start = dateToMySQL(this.query.start)
        this.stop = dateToMySQL(this.query.end)
      }

    }
  }
</script>

<style lang="scss"></style>
