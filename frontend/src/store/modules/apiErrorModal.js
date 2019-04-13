const state = {
  isDisplayed: false,
  message: ''
}

const getters = {

}

const mutations = {

  SET_API_ERROR_MODAL_STATE(state, isDisplayed) {
      state.isDisplayed = isDisplayed
  },

  SET_API_ERROR_MODAL_MESSAGE(state, message) {
    state.message = message
  }
}

const actions = {

  UPDATE_API_ERROR_MODAL_STATE({ commit }, isDisplayed) {
    commit('SET_API_ERROR_MODAL_STATE', isDisplayed)
  },

  UPDATE_API_ERROR_MODAL_MESSAGE({ commit }, message) {
    commit('SET_API_ERROR_MODAL_MESSAGE', message)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
