import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAP_KEY
  }
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
