import Vue from 'vue'
import Vuex from 'vuex'
import sensors from './modules/sensors'
import floods from './modules/floods'
import infowindow from './modules/infowindow'
import subscribeModal from './modules/subscribeModal'
import apiErrorModal from './modules/apiErrorModal'
import floodAreasArray from './modules/floodAreasArray'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    sensors,
    floods,
    infowindow,
    subscribeModal,
    apiErrorModal,
    floodAreasArray
  },
  strict: debug
})
