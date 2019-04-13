import SensorsServiceCreator from '../../api/SensorsService'
import moment from "moment";

const state = {
  localSensors: [],
  eASensors: [],
  currentHistoricalData: [],
  dataUpdated: false
}

const sensorsService = SensorsServiceCreator();

const getters = {

}

const mutations = {

  SET_LOCAL_SENSORS(state, sensors) {
    state.localSensors = sensors
  },

  SET_EA_SENSORS(state, sensors) {
    state.eASensors = sensors
  },

  SET_HISTORICAL_DATA(state, data) {
    state.currentHistoricalData = data
  },

  ADD_WATER_LEVEL_DATA_TEST(state, data) {
    state.currentHistoricalData.readings.push(data)
    state.dataUpdated = true
  },

  SET_DATA_UPDATED_STATE(state, updated) {
    state.dataUpdated = updated
  }
}

const actions = {

  UPDATE_LOCAL_SENSORS({ commit, dispatch }) {
    return sensorsService.getAllLocalSensors()
      .then((response) => {
        commit('SET_LOCAL_SENSORS', response.data)
      })
      .catch(() => {
        dispatch('UPDATE_API_ERROR_MODAL_MESSAGE', "Failed to retrieve local sensors.")
        dispatch('UPDATE_API_ERROR_MODAL_STATE', true)
      })
  },

  UPDATE_EA_SENSORS({ commit, dispatch }) {
    return sensorsService.getAllEASensors()
      .then((response) => {
        commit('SET_EA_SENSORS', response.data)
      })
      .catch(() => {
        dispatch('UPDATE_API_ERROR_MODAL_MESSAGE', "Failed to retrieve EA sensors.")
        dispatch('UPDATE_API_ERROR_MODAL_STATE', true)
      })
  },

  UPDATE_EA_SENSOR_DATA({ commit, dispatch }, id) {
    return sensorsService.getEASensorData(id)
      .then((response) => {
        commit('SET_HISTORICAL_DATA', response.data)
      })
      .catch(() => {
        dispatch('UPDATE_API_ERROR_MODAL_MESSAGE', "Failed to update EA sensor historical data.")
        dispatch('UPDATE_API_ERROR_MODAL_STATE', true)
      })
  },

  UPDATE_LOCAL_SENSOR_DATA({ commit, dispatch }, id) {
    return sensorsService.getLocalSensorData(id)
      .then((response) => {
        commit('SET_HISTORICAL_DATA', response.data)
      })
      .catch(() => {
        dispatch('UPDATE_API_ERROR_MODAL_MESSAGE', "Failed to update local sensor historical data.")
        dispatch('UPDATE_API_ERROR_MODAL_STATE', true)
      })
  },

  UPDATE_WATER_LEVEL_DATA_TEST({ commit }) {
    if(state.currentHistoricalData.length == 0) return

    let readings = state.currentHistoricalData.readings
    let latestReading = readings[readings.length - 1]
    let latestReadingValue = latestReading.value

    let change = Math.random() < 0.5 ? -1 : 1;
    let newValue = parseFloat(parseFloat(latestReadingValue) + (0.05 * change)).toFixed(3)

    if(newValue < 0) newValue = 0
    
    let newDataPoint = {
      value: newValue,
      dateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }

    commit('ADD_WATER_LEVEL_DATA_TEST', newDataPoint)
  },

  UPDATE_DATA_UPDATED_STATE({ commit }, updated) {
    commit('SET_DATA_UPDATED_STATE', updated)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
