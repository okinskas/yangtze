import FloodsServiceCreator from '../../api/FloodsService'
import floodAreasArray from './floodAreasArray'

const state = {
  floodAlerts: [],
  floodAreas: [],
  nearestFloodAreas: [],
  selectedFloodAreas: []
}

const floodsService = FloodsServiceCreator();

const getters = {

}

const mutations = {

  SET_FLOOD_ALERTS(state, floodAlerts) {
    state.floodAlerts = floodAlerts
  },

  SET_FLOOD_AREAS(state, floodAreasArray) {
    let floodAreasObjectArray = []
    for (let floodAreaArray of floodAreasArray) {
      let floodAreaObject = {
        floodAreaID: floodAreaArray.floodAreaID,
        label: floodAreaArray.label,
        path: []
      }

      for (let i = 3; i < floodAreaArray.path.length; i += 3) {
        floodAreaObject.path.push({
          lat: floodAreaArray.path[i][1],
          lng: floodAreaArray.path[i][0]
        })
      }

      if (floodAreaObject.path.length > 3) {
        floodAreasObjectArray.push(floodAreaObject)
      }
    }

    state.floodAreas = floodAreasObjectArray
  },

  SET_NEAREST_FLOOD_AREAS(state, coords) {
    if (coords == null) { state.nearestFloodAreas = []; return }

    let nearestFloodAreas = []

    for (let floodArea of state.floodAreas) {
      for (let pathCoords of floodArea.path) {
        let latDiff = Math.abs(pathCoords.lat - coords.lat())
        let lngDiff = Math.abs(pathCoords.lng - coords.lng())

        let distance = Math.sqrt(Math.pow(latDiff, 2) + Math.pow(lngDiff, 2))

        if (distance < 0.05) {
          nearestFloodAreas.push({ floodAreaID: floodArea.floodAreaID, label: floodArea.label, distance: distance })
          break
        }
      }
    }

    nearestFloodAreas.sort((a, b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0))

    state.nearestFloodAreas = nearestFloodAreas
  },

  SET_SELECTED_FLOOD_AREAS(state, selectedFloodAreas) {
    state.selectedFloodAreas = selectedFloodAreas
  },

  SET_TEST_FLOOD_ALERT(state, floodAlert) {
    state.floodAlerts = floodAlert
  }
}

const actions = {

  UPDATE_FLOOD_ALERTS({ commit, dispatch }) {
    floodsService.getFloodAlerts()
    .then((response) => {
      commit('SET_FLOOD_ALERTS', response.data)
    })
    .catch(() => {
      dispatch('UPDATE_API_ERROR_MODAL_MESSAGE', "Failed to retrieve flood alerts.")
      dispatch('UPDATE_API_ERROR_MODAL_STATE', true)
    })
  },

  UPDATE_FLOOD_AREAS({ commit }) {
    // should be api call to get flood areas
    // floodsService.getAllFloodAreas()
    // .then((polygons) => {
    //     commit('SET_FLOOD_AREAS', polygons)
    // })

    commit('SET_FLOOD_AREAS', floodAreasArray.floodAreas)
  },

  UPDATE_NEAREST_FLOOD_AREAS({ commit }, coords) {
    commit('SET_NEAREST_FLOOD_AREAS', coords)
  },

  UPDATE_SELECTED_FLOOD_AREAS({ commit }, selectedFloodAreas) {
    commit('SET_SELECTED_FLOOD_AREAS', selectedFloodAreas)
  },

  SUBSCRIBE_TO_FLOOD_AREA({ dispatch }, subscriptionData) {
    return floodsService.subscribeToFloodArea(subscriptionData)
    .catch(() => {
      dispatch('UPDATE_API_ERROR_MODAL_MESSAGE', "Failed to suscribe to flood area.")
      dispatch('UPDATE_API_ERROR_MODAL_STATE', true)
    })
  },

  TEST_NO_FLOODING({ commit }) {
    commit('SET_TEST_FLOOD_ALERT', [])
  },

  TEST_FLOOD_ALERT({ commit }) {
    let floodAlert = {
      description: "Great Stour in Canterbury",
      floodAreaID: "064FWF6Canterbury",
      message: "Although beginning to fall, river levels remain high as a result of heavy rainfall. Consequently, the risk of flooding remains. Flooding is affecting low lying land and roads adjacent to the river",
      severity: "Flood Alert",
      severityLevel: 3
    }

    commit('SET_TEST_FLOOD_ALERT', [floodAlert])
  },

  TEST_FLOOD_WARNING({ commit }) {
    let floodWarning = {
      description: "Great Stour in Wye",
      floodAreaID: "064FWF6Wye",
      message: "River levels are high due to persistent heavy rain, and the river is likely to flood.",
      severity: "Flood Warning",
      severityLevel: 2
    }

    commit('SET_TEST_FLOOD_ALERT', [floodWarning])
  },

  TEST_SEVERE_FLOOD_WARNING({ commit }) {
    let severeFloodWarning = {
      description: "Great Stour in Hothfield",
      floodAreaID: "064FWF6Hothfield",
      message: "River levels are very high due to persistent torrential rain, and the river is at extreme risk of flooding.",
      severity: "Severe Flood Warning",
      severityLevel: 1
    }

    commit('SET_TEST_FLOOD_ALERT', [severeFloodWarning])
  },

  FORCE_EMAIL_NOTIFICATION({ dispatch }) {
    return floodsService.forceEmailNotification()
    .catch(() => {
      dispatch('UPDATE_API_ERROR_MODAL_MESSAGE', "Failed to send email notification.")
      dispatch('UPDATE_API_ERROR_MODAL_STATE', true)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
