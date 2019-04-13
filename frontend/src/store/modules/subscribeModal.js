const state = {
  isDisplayed: false,
  postcode: '',
  location: null
}

const getters = {

}

const mutations = {

  SET_SUBSCRIBE_MODAL_STATE(state, isDisplayed) {
    state.isDisplayed = isDisplayed
  },

  SET_POSTCODE(state, postcode) {
    state.postcode = postcode
  },

  SET_POSTCODE_COORDINATES(state, location) {
    state.location = location
  }
}

const actions = {

  UPDATE_SUBSCRIBE_MODAL_STATE({ commit }, isDisplayed) {
    commit('SET_SUBSCRIBE_MODAL_STATE', isDisplayed)
  },

  UPDATE_POSTCODE_LOCATION({ commit, dispatch }, postcode) {
    commit('SET_POSTCODE', postcode)
    let geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ 'address': postcode }, function (results, status) {
      if (status == 'OK') {
        commit('SET_POSTCODE_COORDINATES', results[0].geometry.location)
      } else {
        dispatch('UPDATE_API_ERROR_MODAL_MESSAGE', "Failed to geolocate postcode.")
        dispatch('UPDATE_API_ERROR_MODAL_STATE', true)
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
