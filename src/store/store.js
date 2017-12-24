import Vue from 'vue'
import Vuex from 'vuex'
// import cps from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  // plugins: [
  //   cps()
  // ],
  state: {
    query: {},
    vmsHash: {},
    hostsHash: {},
    clicked: null,
    time: null
  },
  mutations: {
    setQuery (state, query) {
      state.query = query
    },
    setVmHash (state, vmsHash) {
      state.vmsHash = vmsHash
    },
    setHostHash (state, hostsHash) {
      state.hostsHash = hostsHash
    },
    checkClicked (state, clicked) {
      state.clicked = clicked
    },
    setTime (state, time) {
      state.time = time
    }
  },
  actions: {
    setVmHash ({commit}, vmsHash) {
      commit('setVmHash', vmsHash)
    },
    setHostHash ({commit}, hostsHash) {
      commit('setHostHash', hostsHash)
    },
    setQuery ({commit}, query) {
      commit('setQuery', query)
    },
    checkClicked ({commit}, clicked) {
      commit('checkClicked', clicked)
    },
    setTime ({commit}, time) {
      commit('setTime', time)
    }
  }
})
