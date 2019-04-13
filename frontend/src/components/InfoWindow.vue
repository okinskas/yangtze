<template>
  <div>
    <div class="columns">
      <div class="column is-full">
        <h2>{{ title }}</h2>
        <div id="info-content-wrapper">
          <h3>
            <span>Latest Reading:</span>
          </h3>
          <p>
            <span class="important-data">{{ time }}</span>
            <span> on </span>
            <span class="important-data">{{ date }}</span>
          </p>
          <h3>
            <span>Current Water Level:</span>
          </h3>
          <p>
            <span class="important-data">{{ currentWaterLevel }} metres</span>
          </p>
        </div>
        <div id="historical-graph-wrapper">
          <h3>
            <span>Water Level History</span>
          </h3>
          <div id="range-button-wrapper">
            <button
              id="Last Day"
              v-bind:class="{ isSelected: currentDataRange == 'day' }"
              v-on:click="currentDataRange != 'day' ? setRangeToLastDay() : ''"
            >Last Day</button>
            <button
              id="Last Week"
              v-bind:class="{ isSelected: currentDataRange == 'week' }"
              v-on:click="currentDataRange != 'week' ? setRangeToLastWeek() : ''"
            >Last Week</button>
            <button
              id="Last Month"
              v-bind:class="{ isSelected: currentDataRange == 'month' }"
              v-on:click="currentDataRange != 'month' ? setRangeToLastMonth() : ''"
            >Last Month</button>
          </div>
          <historical-data-graph
						id="historical-graph"
						:data="chartData"
						:options="chartOptions"
					/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import HistoricalDataGraph from "./HistoricalDataGraph";
import moment from "moment";

export default {
  components: {
    HistoricalDataGraph
  },

  name: "InfoWindow",

  data() {
    return {
      isEASensor: false,

      currentDataRange: "",

      title: "",

      date: "",
      time: "",
      currentWaterLevel: 0,

      chartData: {
        labels: [],
        datasets: []
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        lineTension: 0,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Water Level (m)"
              },
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        legend: {
          onClick: e => e.stopPropagation()
        },
        tooltips: {
          mode: "index",
          intersect: false,
          filter: function(tooltipItem) {
            return tooltipItem.datasetIndex === 0;
          },
          callbacks: {
            label: function(tooltipItem, data) {
              let itemIndex = tooltipItem.index;
              let datasetIndex = tooltipItem.datasetIndex;

              let label =
                " " + data.datasets[datasetIndex].data[itemIndex] + "m";

              return label;
            },
            title: function(tooltipItem, data) {
              let itemIndex = tooltipItem[0].index;
              let datasetIndex = tooltipItem[0].datasetIndex;

              let date = tooltipItem[0].xLabel;
              let time = data.datasets[datasetIndex].times[itemIndex];

              let title = "date: " + date + "\ntime: " + time;

              return title;
            }
          }
        }
      }
    };
  },

  props: ["historicalData", "updated"],

  methods: {
    updateLatestReadingData() {
      if (this.isEASensor) {
        this.title =
          this.historicalData.label +
          " (" +
          this.historicalData.riverName +
          ")";
      } else {
        this.title = "UKC Sensor (" + this.historicalData.devId + ")";
      }

      let readings = this.historicalData.readings;
      let latestReading = readings[readings.length - 1];

      let dataValues = this.extractDataValues(latestReading);

      this.date = dataValues[0];
      this.time = dataValues[1];
      this.currentWaterLevel = dataValues[2];
    },
    setChartData(data) {
      let newData = {
        labels: [],
        datasets: []
      };

      let waterLevelDataset = this.getWaterLevelDatasetStructure();

      for (let reading of data.readings) {
        let dataValues = this.extractDataValues(reading);

        newData.labels.push(dataValues[0]);
        waterLevelDataset.times.push(dataValues[1]);
        waterLevelDataset.data.push(dataValues[2]);
      }

      if (this.isEASensor) {
        let typicalLowDataset = this.getTypicalLowDatasetStructure(data);
        let typicalHighDataset = this.getTypicalHighDatasetStructure(data);
        typicalLowDataset.data.fill(data.typicalRangeLow);
        typicalHighDataset.data.fill(data.typicalRangeHigh);

        newData.datasets = [
          waterLevelDataset,
          typicalLowDataset,
          typicalHighDataset
        ];
      } else {
        let floodPlainDataset = this.getFloodPlainDatasetStructure(data);
        floodPlainDataset.data.fill(data.distanceFloodPlainFromRiverBed);

        newData.datasets = [
					waterLevelDataset,
					floodPlainDataset
				];
      }

      Vue.set(this, "chartData", newData);
    },
    extractDataValues(reading) {
      let dateTime = reading.dateTime;
      let date = dateTime.substring(2, 10);
      let time = dateTime.substring(11, 19);

      let waterLevel = reading.value;

      return [date, time, waterLevel];
    },
    getWaterLevelDatasetStructure() {
      return {
        pointRadius: 0,
        pointHitRadius: 4,
        label: "Water Level",
        borderColor: "#3b68e5",
        backgroundColor: "rgba(59, 104, 229, 0.2)",
        data: [],
        times: []
      };
    },
    getTypicalLowDatasetStructure(data) {
      return {
        label: "Typical Low",
        pointRadius: 0,
        pointHitRadius: 0,
        borderColor: "#37c94a",
        backgroundColor: "#56e269",
        fill: false,
        showLines: false,
        data: new Array(data.readings.length)
      };
    },
    getTypicalHighDatasetStructure(data) {
      return {
        label: "Typical High",
        pointRadius: 0,
        pointHitRadius: 0,
        borderColor: "#e74c3c",
        backgroundColor: "#ef7b6f",
        fill: false,
        showLines: false,
        data: new Array(data.readings.length)
      };
    },
    getFloodPlainDatasetStructure(data) {
      return {
        label: "Flood Plain",
        pointRadius: 0,
        pointHitRadius: 0,
        borderColor: "#e74c3c",
        backgroundColor: "#ef7b6f",
        fill: false,
        showLines: false,
        data: new Array(data.readings.length)
      };
    },
    determineSensorType() {
      if (this.historicalData.label) this.isEASensor = true;
      else this.isEASensor = false;
    },
    closeWindow() {
      this.$store.dispatch("UPDATE_INFO_WINDOW_STATE", false);
    },
    setRangeToLastDay() {
      this.currentDataRange = "day";
      let dateYesterday = moment(new Date() - 1000 * 3600 * 24).format(
        "YYYY-MM-DD HH:mm:ss"
      );

      let newData = this.getNewRangeData(dateYesterday);

      this.setChartData(newData);
    },
    setRangeToLastWeek() {
      this.currentDataRange = "week";
      let dateLastWeek = moment(new Date() - 1000 * 3600 * 24 * 7).format(
        "YYYY-MM-DD HH:mm:ss"
      );

      let newData = this.getNewRangeData(dateLastWeek);

      this.setChartData(newData);
    },
    setRangeToLastMonth() {
      this.currentDataRange = "month";
      let dateLastMonth = moment(new Date() - 1000 * 3600 * 24 * 30).format(
        "YYYY-MM-DD HH:mm:ss"
      );

      let newData = this.getNewRangeData(dateLastMonth);

      this.setChartData(newData);
    },
    getNewRangeData(date) {
      this.updateLatestReadingData();
      let newReadings = this.historicalData.readings.filter(reading => {
        let readingDate = reading.dateTime.replace("T", " ").substring(0, 19);
        return readingDate > date;
      });

      let newData = Object.assign({}, this.historicalData);
      newData.readings = newReadings;

      return newData;
    },
    updateData() {
      this.determineSensorType();
      this.updateLatestReadingData();
      switch (this.currentDataRange) {
        case "day":
          this.setRangeToLastDay();
          break;
        case "week":
          this.setRangeToLastWeek();
          break;
        case "month":
          this.setRangeToLastMonth();
      }
    }
  },

  watch: {
    updated: function() {
      this.updateData()
      this.$store.dispatch('UPDATE_DATA_UPDATED_STATE', false)   
    },

    historicalData: function() {
      this.updateData() 
    }
  },

  mounted() {
    this.determineSensorType();
    this.updateLatestReadingData();
    this.setRangeToLastWeek();
  }
};
</script>

<style scoped>
h2 {
  font-size: 1.3em;
}
h3 {
  margin-top: 0.5em !important;
}
#info-content-wrapper {
  margin: 1em;
}
span:not(.important-data) {
  opacity: 0.6;
}
#info-content-wrapper > * {
  margin: 0;
}
#historical-graph {
  height: 100%;
  width: 100%;
}
#historical-graph-wrapper {
  height: 200px;
  width: 100%;
}
#close-window-button {
  position: absolute;
  font-weight: bold;
  font-size: 1.5em;
  right: 0;
  top: 0;
  margin: 0.3em 0.5em;
}
#close-window-button:hover {
  cursor: pointer;
}
.isSelected {
  font-weight: bold;
}
</style>
