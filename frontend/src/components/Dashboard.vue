<template >
  <section class="section" id="dashboard" style="padding-bottom: 2em">
    <api-error-modal v-if="isDisplayingAPIErrorModal" :message="errorMessage"/>
    <subscribe-modal v-if="isDisplayingSubscribeModal"/>
    <nav-bar/>
    <div class="columns is-desktop" style="padding-top:15px">
      <div class="column">
        <google-map/>
        <map-key/>
      </div>
      <div class="column is-one-third-desktop is-full">
        <flood-alert/>
        <info-window
          v-if="isDisplayingInfoWindow && currentHistoricalData.readings"
          v-bind:historicalData="currentHistoricalData"
          v-bind:updated="dataUpdated"
        />
        <get-started v-if="!isDisplayingInfoWindow"/>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import googleMaps from "./GoogleMap";
import navBar from "./NavBar";
import floodAlert from "./FloodAlert";
import infoWindow from "./InfoWindow";
import mapKey from "./MapKey";
import getStarted from "./InfoGetStarted";
import subscribeModal from "./SubscribeModal";
import apiErrorModal from "./APIErrorModal"

export default {
  components: {
    "google-map": googleMaps,
    "nav-bar": navBar,
    "info-window": infoWindow,
    "flood-alert": floodAlert,
    "map-key": mapKey,
    "get-started": getStarted,
    "subscribe-modal": subscribeModal,
    "api-error-modal": apiErrorModal
  },
  data() {
    return {
    };
  },

  computed: {
    ...mapState({
      currentHistoricalData: state => state.sensors.currentHistoricalData,
      dataUpdated: state => state.sensors.dataUpdated,
      isDisplayingInfoWindow: state => state.infowindow.isDisplayed,
      isDisplayingSubscribeModal: state => state.subscribeModal.isDisplayed,
      isDisplayingAPIErrorModal: state => state.apiErrorModal.isDisplayed,
      errorMessage: state => state.apiErrorModal.message
    })
  },
  methods: {
    stopDisplayingInfo() {
      this.$store.dispatch("UPDATE_INFO_WINDOW_STATE", false);
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
h1 {
  font-size: 2em;
}
table {
  width: 100%;
}
table > tbody td {
  padding: 0.5em;
}
table > tbody > tr {
  font-size: 1em;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: none;
}
#dashboard {
  padding: 0
}

@media (min-width: 1088px) {
  #dashboard {
    padding: 3rem 1.5rem;
  }
}
</style>
