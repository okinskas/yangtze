<template>
  <div class="columns">
    <div class="column">
      <div id="map-wrapper">
        <GmapMap id="map" ref="mapRef" :center="center" :zoom="11">
          <GmapMarker
            v-for="(m, index) in markers"
            :key="index"
            :position="m.position"
            :icon="getIcon(m.position)"
            v-on:click="panTo(m.position), displayInfo(index)"
          />
        </GmapMap>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "GoogleMap",

  data() {
    return {
      center: { lat: 51, lng: 1 },
      markers: [],
      floodAreaPolygonObjects: []
    };
  },

  computed: {
    ...mapState({
      floodAreas: state => state.floods.floodAreas,
      selectedFloodAreas: state => state.floods.selectedFloodAreas,
      floodAlerts: state => state.floods.floodAlerts,
      localSensors: state => state.sensors.localSensors,
      eASensors: state => state.sensors.eASensors,
      currentInfoWindowSensorIndex: state => state.infowindow.currentSensorIndex
    })
  },

  mounted() {
    this.$store.dispatch("UPDATE_FLOOD_AREAS");
    this.$store.dispatch("UPDATE_EA_SENSORS").then(() => {
      this.$store.dispatch("UPDATE_LOCAL_SENSORS");
    });

    setTimeout(this.updateFloodAreaColours, 1000);
  },

  watch: {
    floodAreas: function() {
      this.setFloodAreas();
      this.fitBounds();
    },

    floodAlerts: function() {
      this.updateFloodAreaColours();
    },

    localSensors: function() {
      this.plotLocalSensors();
    },

    eASensors: function() {
      this.plotEASensors();
    },

    selectedFloodAreas: function() {
      this.selectFloodAreas();
    }
  },

  methods: {
    plotEASensors() {
      let eASensorsCoords = this.eASensors.map(sensor => {
        return {
          lat: parseFloat(sensor.lat),
          lng: parseFloat(sensor.long)
        };
      });
      this.plotSensors(eASensorsCoords);
    },
    plotLocalSensors() {
      let localSensorsCoords = this.localSensors.map(sensor => {
        return {
          lat: parseFloat(sensor.latitude),
          lng: parseFloat(sensor.longitude)
        };
      });
      this.plotSensors(localSensorsCoords);
    },
    selectFloodAreas() {
      for (let floodAreaPolygonObject of this.floodAreaPolygonObjects) {
        let match = false;
        for (let selectedFloodArea of this.selectedFloodAreas) {
          if (selectedFloodArea == floodAreaPolygonObject.id) {
            floodAreaPolygonObject.setOptions({
              fillColor: "#000",
              strokeColor: "#000"
            });

            match = true;
          }
        }

        if (!match) {
          floodAreaPolygonObject.setOptions({
            fillColor: floodAreaPolygonObject.initialFillColor,
            strokeColor: floodAreaPolygonObject.initialStrokeColor
          });
        }
      }
    },
    setFloodAreas() {
      this.floodAreaPolygonObjects = [];
      this.$refs.mapRef.$mapPromise.then(map => {
        for (let floodArea of this.floodAreas) {
          let fa = new window.google.maps.Polygon({
            id: floodArea.id,
            floodAreaID: floodArea.floodAreaID,
            paths: floodArea.path,
            strokeColor: "#80ff00",
            strokeWeight: "3",
            fillColor: "#80ff00",
            fillOpacity: "0.3",
            initialStrokeColor: "#80ff00",
            initialFillColor: "#80ff00"
          });
          this.floodAreaPolygonObjects.push(fa);
          fa.setMap(map);
        }
      });
    },
    updateFloodAreaColours() {
      for (let floodAreaPolygon of this.floodAreaPolygonObjects) {
        let match = false;
        for (let floodAlert of this.floodAlerts) {
          if (floodAreaPolygon.floodAreaID == floodAlert.floodAreaID) {
            switch (floodAlert.severityLevel) {
              case 3:
                floodAreaPolygon.setOptions({
                  fillColor: "#ffbf00",
                  strokeColor: "#ffbf00",
                  initialFillColor: "#ffbf00",
                  initialStrokeColor: "#ffbf00",
                  strokeWeight: 5
                });
                break;
              case 2:
                floodAreaPolygon.setOptions({
                  fillColor: "#ff6000",
                  strokeColor: "#ff6000",
                  initialFillColor: "#ff6000",
                  initialStrokeColor: "#ff6000",
                  strokeWeight: 5
                });
                break;
              case 1:
                floodAreaPolygon.setOptions({
                  fillColor: "#f31a25",
                  strokeColor: "#f31a25",
                  initialFillColor: "#f31a25",
                  initialStrokeColor: "#f31a25",
                  strokeWeight: 5
                });
                break;
            }

            match = true;
          }
        }

        if (!match)
          floodAreaPolygon.setOptions({
            fillColor: "#80ff00",
            strokeColor: "#80ff00",
            initialFillColor: "#80ff00",
            initialStrokeColor: "#80ff00",
            strokeWeight: 3
          });
      }
    },
    addMarker(coordinates) {
      const coords = {
        lat: coordinates.lat,
        lng: coordinates.lng
      };
      this.markers.push({ position: coords });
    },
    getIcon(markerPos) {
      let localSensorsCoords = this.localSensors.map(sensor => {
        return {
          lat: sensor.latitude,
          lng: sensor.longitude
        };
      });
      let eASensorsCoords = this.eASensors.map(sensor => {
        return { lat: sensor.lat, lng: sensor.long };
      });

      if (this.existsInArray(markerPos, localSensorsCoords))
        return { url: require("../assets/purple-marker.svg") };
      else if (this.existsInArray(markerPos, eASensorsCoords))
        return { url: require("../assets/blue-marker.svg") };
    },
    panTo(pos) {
      this.$refs.mapRef.$mapPromise.then(map => {
        map.panTo({ lat: pos.lat, lng: pos.lng });
      });
    },
    fitBounds() {
      this.$refs.mapRef.$mapPromise.then(map => {
        let b = new window.google.maps.LatLngBounds();

        for (let floodArea of this.floodAreas) {
          for (let coord of floodArea.path) {
            b.extend(coord);
          }
        }

        map.fitBounds(b);
      });
    },
    plotSensors(sensors) {
      for (let sensor of sensors) {
        this.addMarker(sensor);
      }
    },
    existsInArray(object, array) {
      for (let element of array) {
        if (element.lat == object.lat && element.lng == object.lng) {
          return true;
        }
      }
      return false;
    },
    displayInfo(index) {
      if (index == this.currentInfoWindowSensorIndex) return;

      let sensorID;
      let dispatchFunction;

      if (index < this.eASensors.length) {
        sensorID = this.eASensors[index].notation;
        dispatchFunction = "UPDATE_EA_SENSOR_DATA";
      } else {
        sensorID = this.localSensors[index - this.eASensors.length].devId;
        dispatchFunction = "UPDATE_LOCAL_SENSOR_DATA";
      }

      return this.$store.dispatch(dispatchFunction, sensorID).then(() => {
        this.$store.dispatch("UPDATE_INFO_WINDOW_STATE", true);
        this.$store.dispatch("UPDATE_CURRENT_SENSOR_INDEX", index);
      });
    }
  }
};
</script>

<style>
#map-wrapper {
  height: 600px;
}
#map {
  width: 100%;
  height: 100%;
  z-index: 40;
}
.vue-map {
  border-radius: 4px;
}
</style>
