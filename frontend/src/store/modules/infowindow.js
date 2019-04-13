const state = {
  isDisplayed: false,
  currentSensorIndex: null
}

const getters = {

}

const mutations = {

  SET_INFO_WINDOW_STATE(state, isDisplayed) {
    state.isDisplayed = isDisplayed
  },

  TOGGLE_INFO_WINDOW() {
    state.isDisplayed = !state.isDisplayed
  },

  SET_SENSOR_INDEX(state, index) {
    state.currentSensorIndex = index
  }
}

const actions = {

  UPDATE_CURRENT_SENSOR_INDEX({ commit }, index) {
    commit('SET_SENSOR_INDEX', index)
  },

  UPDATE_INFO_WINDOW_STATE({ commit }, isDisplayed) {
    commit('SET_INFO_WINDOW_STATE', isDisplayed)
  },

  TOGGLE_INFO_WINDOW_STATE({ commit }) {
    commit('TOGGLE_INFO_WINDOW')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
