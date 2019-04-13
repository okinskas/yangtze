<template>
  <div
    class="notification" style="padding: 1.5rem"
    v-bind:class="{ 'is-danger': areFloodAlerts, 'is-success': !areFloodAlerts }"
  >
    <h4 class="title is-4">Flood Alerts</h4>
    <p v-if="!areFloodAlerts">Alerts will appear here if any flooding occurs</p>
    <div v-for="floodAlert in floodAlerts" v-bind:key="floodAlert.floodAreaID" :id="floodAlert.floodAreaID" class="flood-alert" v-on:click="toggleMessageView(floodAlert.floodAreaID)">
      <p><strong>{{ floodAlert.description }}</strong> (severity level: {{ floodAlert.severityLevel }})</p>
      <div class="flood-alert-message">
        <p style="font-style: italic">{{ floodAlert.severity }}</p>
        <p>{{ floodAlert.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "FloodAlert",

  data() {
    return {
      areFloodAlerts: false,
      poller: null
    };
  },

  computed: {
    ...mapState({
      floodAlerts: state => state.floods.floodAlerts
    })
  },

  watch: {
    floodAlerts: function() {
      this.areFloodAlerts = this.floodAlerts.length > 0;
    }
  },

  methods: {
    pollFloodData() {
      this.$store.dispatch("UPDATE_FLOOD_ALERTS").then(() => {
        this.poller = setTimeout(this.pollFloodData, 15 * 60 * 1000);
      });
    },
    toggleMessageView(id) {
      document.getElementById(id).querySelector(".flood-alert-message").classList.toggle('visible')
    }
  },

  mounted() {
    this.pollFloodData();
  }
};
</script>

<style>
.is-danger {
  background-color: #f31a25 !important;
  color: #fff !important;
}
.flood-alert {
  border-radius: 4px;
}
.flood-alert:hover {
  background-color: #ee3039;
  cursor: pointer;
}
.flood-alert-message {
  display: none;
}
.visible {
  display: block;
}
</style>
