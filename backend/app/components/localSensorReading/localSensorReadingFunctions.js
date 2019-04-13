const { data, application } = require('ttn');

const appID = 'kentwatersensors';
const accessKey = 'ttn-account-v2.mRzaS7HOchwKsQxdj1zD-KwjxXAptb7s9pca78Nv7_U';

module.exports = (LocalSensorReading, LocalSensor) => {

  // discover handler and open mqtt connection
  const mqttListener = () => {
    console.log('receiving mqtt');
    data(appID, accessKey)
      .then(function (client) {
        console.log('client received');
        client.on("uplink", function (devID, payload) {
          console.log("Received uplink from ", devID);
          updateSensorReadings(payload);
        })
      })
      .catch(function (err) {
        console.error(err);
        process.exit(1)
      });
  };

  const updateSensorReadings = async reading => {
    let filteredReading = {};

    if (reading.hasOwnProperty('dev_id')) {
      filteredReading.localsensorId = reading.dev_id;
    }
    if (reading.hasOwnProperty('counter')) {
      filteredReading.counter = reading.counter;
    }
    if (reading.hasOwnProperty('metadata')
      && reading.metadata.hasOwnProperty('time')) {
      filteredReading.dateTime = reading.metadata.time;
    }
    if (reading.hasOwnProperty('payload_raw')) {
      let raw = reading.payload_raw;
      let json = raw.toJSON();
      let data = json.data;
      let nx = data[0];
      let ny = data[1];
      let distSensorFromWaterLevel = (nx << 8) + ny;

      let finalReading = await LocalSensor.findOne({
        where: {
          devId: filteredReading.localsensorId
        },
        attributes: [
          'distanceSensorFromRiverBed'
        ]
      }).then(result => {
        let cleanResults = result.dataValues;
        let distSensorFromRiverBed = cleanResults.distanceSensorFromRiverBed;
        filteredReading.value = distSensorFromRiverBed - (distSensorFromWaterLevel / 1000);
        return filteredReading;
      });

      console.log('final reading: ', finalReading);

      LocalSensorReading.create(finalReading)
        .then(() => {
          console.log('>>>>>>>> Successfully added new sensor reading. <<<<<<<<<<<<')
        })
        .catch(err => {
          console.log('error creatings local sensor reading.');
        })

    }
  };

  const getLocalReadings = (id) => {
    return LocalSensor.findOne({
      where: {
        devId: id
      },
      attributes: [
        'devId',
        'latitude',
        'longitude',
        'altitude',
        'distanceFloodPlainFromRiverBed'
      ]
    })
      .then(result => {
        let builtResult = result.dataValues;
        console.log('easensor info: ', builtResult);
        return LocalSensorReading.findAll({
          where: {
            localsensorId: id
          },
          attributes: [
            'counter',
            'value',
            'dateTime'
          ],
          order: [
            ['dateTime', 'ASC']
          ]
        })
          .then(readings => {
            builtResult.readings = [];
            for (let reading of readings) {
              builtResult.readings.push(reading.dataValues);
            }
            console.log('added results: ', builtResult);
            return builtResult;
          })
          .catch(err => {
            console.log('localsensorreadings error');
            return Promise.reject('localsensorreadings error');
          })
      })
  };

  const startMqttClient = () => {
    mqttListener();
  };

  return {
    startMqttClient,
    getLocalReadings
  }
};
