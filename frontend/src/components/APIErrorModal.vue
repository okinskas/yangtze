<template>
  <div class="modal is-active" style="z-index: 1000">
    <div class="modal-background" v-on:click="hideModal()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Error communicating with the server...</p>
        <button class="delete" aria-label="close" v-on:click="hideModal()"></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
          <div class="field">Error message:</div>
          <div style="padding-bottom: 2em"><strong>{{ message }}</strong></div>
          <blockquote>
            <div class="field">
              <p>Please note that, due to server communication issues, the river and flood information currently displayed may be <strong>out of date</strong>.</p>
            </div>
            <div>
              <p>Ensure your internet connection is stable, and check back later when server issues will hopefully be resolved.</p>
            </div>
          </blockquote>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" v-on:click="hideModal()">OK</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "APIErrorModal",
  data() {
    return {};
  },

  props: ["message"],

  methods: {
    hideModal() {
      this.$store.dispatch("UPDATE_API_ERROR_MODAL_STATE", false);
    }
  }
};
</script>
