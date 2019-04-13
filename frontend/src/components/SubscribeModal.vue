<template>
  <div class="modal-container">
    <div class="modal is-active">
      <div v-on:click="hideModal()" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Flood Areas Near: {{ postcode }}</p>
        </header>
        <section class="modal-card-body">
          <div v-if="nearestFloodAreas.length != 0">
            <p>Select at least one flood area from the list below.</p>
            <p>Selected flood areas will be shown on the map.</p>
          </div>

          <div class="select is-multiple is-fullwidth" style="padding: 1em">
            <div class="field" v-for="floodArea in nearestFloodAreas" v-bind:key="floodArea.floodAreaID">
              <b-checkbox v-model="checkboxGroup" :native-value="floodArea.floodAreaID">{{ floodArea.label }}</b-checkbox>
            </div>
            <div v-if="nearestFloodAreas.length == 0">No flood areas found in that area.</div>
          </div>

          <div class="user-input-wrapper" v-if="nearestFloodAreas.length != 0">
            <p>Enter your email address below to subscribe to the selected flood areas, and receive alerts when they flood.</p>
            <div class="field">
              <label class="label"></label>
              <div class="control has-icons-left">
                <input
                  type="email"
                  class="input"
                  id="email"
                  placeholder="Enter email here"
                  v-model="email"
                  required
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="field is-grouped">
            <div class="control">
              <button
                id="subscribe"
                class="button is-link"
                v-on:click="subscribe()"
                :disabled="canSubscribe()"
              >Subscribe</button>
            </div>
            <div class="control">
              <button class="button is-text" v-on:click="hideModal()">Close</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { mapState } from "vuex";
Vue.use(Buefy);

export default {
  name: "PopUp",
  data() {
    return {
      checkboxGroup: [],
      email: ""
    };
  },

  computed: {
    ...mapState({
      postcode: state => state.subscribeModal.postcode,
      postCodeCoordinates: state => state.subscribeModal.location,
      nearestFloodAreas: state => state.floods.nearestFloodAreas
    })
  },

  watch: {
    postCodeCoordinates: function() {
      this.$store.dispatch(
        "UPDATE_NEAREST_FLOOD_AREAS",
        this.postCodeCoordinates
      );
    },

    checkboxGroup: function() {
      this.$store.dispatch("UPDATE_SELECTED_FLOOD_AREAS", this.checkboxGroup);
    }
  },

  methods: {
    hideModal() {
      this.$store.dispatch("UPDATE_SUBSCRIBE_MODAL_STATE", false);
      this.$store.dispatch("UPDATE_SELECTED_FLOOD_AREAS", []);
      this.$store.dispatch("UPDATE_NEAREST_FLOOD_AREAS", null);
    },
    canSubscribe() {
      return (
        this.checkboxGroup.length == 0 ||
        this.nearestFloodAreas.length == 0 ||
        this.email == ""
      );
    },
    subscribe() {
      let validEmail = document.getElementById("email").checkValidity();

      if (!validEmail) {
        this.email = "";
        document.getElementById("email").placeholder = "Invalid email";
      } else {
        document.getElementById("subscribe").classList =
          "button is-link is-loading";
        this.$store
          .dispatch("SUBSCRIBE_TO_FLOOD_AREA", {
            email: this.email,
            floodAreaIDs: this.checkboxGroup
          })
          .then(() => {
            document.getElementById("subscribe").classList =
              "button is-success";
            document.getElementById("subscribe").innerHTML = "Subscribed!";
            document.getElementById("subscribe").setAttribute("disabled", true);
          })
          .finally(() => {
            setTimeout(() => {
              this.hideModal();
            }, 1500);
          });
      }
    }
  }
};
</script>

<style scoped>
.modal-card {
  position: absolute !important;
  bottom: 1em !important;
  width: 90% !important;
  margin: 0 auto !important;
}
.modal {
  z-index: 100 !important;
}
@media (min-width: 1088px) {
  .modal-card {
    position: absolute !important;
    bottom: 1.5rem !important;
    right: 1.5rem !important;
    width: calc(33% - 1.5rem - 4px) !important;
    min-height: 250px !important;
  }
  .modal {
    z-index: 20 !important
  }
}  

.modal-background {
  background-color: rgba(10, 10, 10, 0.7);
}
.is-success {
  opacity: 1 !important;
}
</style>
