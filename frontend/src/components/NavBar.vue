<template>
  <div id="app">
    <nav
      id="nav"
      class="navbar is-fixed-top-desktop has-shadow"
      role="navigation"
      aria-label="main navigation"
      style="padding: 0 1rem;"
    >
      <div class="navbar-brand">
        <h1 style="font-size:1.7em;">
          <strong>Great Stour Project</strong>
        </h1>
        <div class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': showNav }">
        <div class="navbar-start">
          <div class="navbar-item">
            <div v-on:click="toggleInfoWindow()" class="button">Getting Started</div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field has-addons">
              <div class="control has-icons-left">
                <input
                  class="input has-icon-left"
                  type="text"
                  id="postcode"
                  placeholder="Enter a postcode"
                  v-on:keyup.enter="displayModal()"
                  required
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-home"></i>
                </span>
              </div>
              <div class="control">
                <a v-on:click="displayModal()" class="button">Search</a>
              </div>
            </div>
          </div>
          <div class="navbar-item">
            <div class="field has-addons">
              <div class="control">
                <div class="dropdown is-right" id="accessibility-dropdown" v-on:click="toggleDropdown('accessibility-dropdown')">
                  <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                      <span>Accessibility</span>
                      <span class="icon is-small">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      <div class="dropdown-item">
                        <strong>Adjust Font Size</strong>
                      </div>
                      <hr class="dropdown-divider">
                      <a class="dropdown-item" v-on:click.stop="setRegularFontSize()">Regular</a>
                      <a class="dropdown-item" v-on:click.stop="setLargeFontSize()">Large</a>
                      <a class="dropdown-item" v-on:click.stop="setExtraLargeFontSize()">Extra Large</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="navbar-item">
            <div class="field has-addons">
              <div class="control">
                <div class="dropdown is-right" id="testing-dropdown" v-on:click="toggleDropdown('testing-dropdown')">
                  <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                      <span>Test</span>
                      <span class="icon is-small">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      <div class="dropdown-item">
                        <strong>Test Functionality</strong>
                      </div>
                      <hr class="dropdown-divider">
                      <a class="navbar-item" v-on:click="noFloodingTest()">No Flooding</a>
                      <a class="navbar-item" v-on:click="floodAlertTest()">Flood Alert</a>
                      <a class="navbar-item" v-on:click="floodWarningTest()">Flood Warning</a>
                      <a class="navbar-item" v-on:click="severeFloodWarningTest()">Severe Flood Warning</a>
                      <hr class="navbar-divider">
                      <a class="navbar-item" v-on:click="floodAlertEmailTest()">Flood Alert Email</a>
                      <a class="navbar-item" v-on:click="apiIssuesTest()">API Issues</a>
                      <a class="navbar-item" v-on:click.stop="addWaterLevelDataTest()">Add Water Level Data</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      showNav: false
    };
  },

  computed: {
    ...mapState({
      isDisplayingInfoWindow: state => state.infowindow.isDisplayed
    })
  },

  methods: {
    displayModal() {
      if (document.getElementById("postcode").checkValidity()) {
        this.showNav = false;
        let postcode = document.getElementById("postcode").value.toUpperCase();
        this.$store.dispatch("UPDATE_POSTCODE_LOCATION", postcode);
        this.$store.dispatch("UPDATE_SUBSCRIBE_MODAL_STATE", true);
      }
    },

    burgerLaunch() {
      document.addEventListener("DOMContentLoaded", () => {
        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(
          document.querySelectorAll(".navbar-burger"),
          0
        );

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {
          alert("empty bar");
          // Add a click event on each of them
          $navbarBurgers.forEach(el => {
            el.addEventListener("click", () => {
              // Get the target from the "data-target" attribute
              const target = el.dataset.target;
              const $target = document.getElementById(target);

              // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
              el.classList.toggle("is-active");
              $target.classList.toggle("is-active");
            });
          });
        }
      });
    },
    toggleDropdown(id) {
      let dropdowns = document.querySelectorAll('.dropdown')

      for(let dropdown of dropdowns) {
        if(dropdown != document.getElementById(id)) dropdown.classList.remove('is-active')
      }

      document.getElementById(id).classList.toggle('is-active')     
    },
    setRegularFontSize() {
      document.body.classList = "regular";
      document.getElementById("dashboard").classList =
        "section regular-padding";
    },
    setLargeFontSize() {
      document.body.classList = "large";
      document.getElementById("dashboard").classList = "section large-padding";
    },
    setExtraLargeFontSize() {
      document.body.classList = "extra-large";
      document.getElementById("dashboard").classList =
        "section extra-large-padding";
    },
    toggleInfoWindow() {
      this.$store.dispatch("TOGGLE_INFO_WINDOW_STATE");
    },
    noFloodingTest() {
      this.$store.dispatch('TEST_NO_FLOODING')
    },
    floodAlertTest() {
      this.$store.dispatch('TEST_FLOOD_ALERT')
    },
    floodWarningTest() {
      this.$store.dispatch('TEST_FLOOD_WARNING')
    },
    severeFloodWarningTest() {
      this.$store.dispatch('TEST_SEVERE_FLOOD_WARNING')
    },
    floodAlertEmailTest() {
      this.$store.dispatch('FORCE_EMAIL_NOTIFICATION')
    },
    apiIssuesTest() {
      this.$store.dispatch('UPDATE_API_ERROR_MODAL_MESSAGE', "Oops, something went wrong.")
      this.$store.dispatch('UPDATE_API_ERROR_MODAL_STATE', true)
    },
    addWaterLevelDataTest() {
      if(this.isDisplayingInfoWindow) {
        this.$store.dispatch('UPDATE_WATER_LEVEL_DATA_TEST')
      }
    }
  }
};
</script>

<style>
.field {
  display: flex !important;
  flex-direction: row !important;
  justify-content: center !important;
}
.navbar {
  z-index: 51 !important;
}
.navbar-menu {
  overflow: visible !important;
}
.regular {
  font-size: 1em !important;
}
.large {
  font-size: 1.15em !important;
}
.extra-large {
  font-size: 1.3em !important;
}
a {
  user-select: none;
}

@media (Min-width: 1088px) {
  .regular-padding {
    padding-top: 3rem !important;
  }
  .large-padding {
    padding-top: 3.5rem !important;
  }
  .extra-large-padding {
    padding-top: 4rem !important;
  }
}
</style>
