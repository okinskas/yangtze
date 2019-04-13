const rp = require('request-promise');
const cron = require('node-cron');
const __BASE__ = 'https://environment.data.gov.uk/flood-monitoring/id/stations';
const __GREAT_STOUR__ = `${__BASE__}?riverName=Great%20Stour`;
const __LATEST_READING__ = `https://environment.data.gov.uk/flood-monitoring/data/readings?latest`;

module.exports = (EaSensor, EaReading) => {

  const getLatestData = () => {
    return EaSensor.findAll({
      attributes: [
        'notation',
        'lat',
        'long',
        'label',
        'riverName',
        'typicalRangeHigh',
        'typicalRangeLow',
        'scaleMax',
        'status'
      ]
    })
      .then(async results => {
        let sensors = [];
        for (let result of results) {
          let sensor = result.dataValues;
          let reading = await EaReading.findAll({
            limit: 1,
            where: {
              easensorId: sensor.notation
            },
            attributes: [
              'value',
              'dateTime'
            ],
            order: [
              ['dateTime', 'DESC']
            ]
          });

          if (reading && reading.length > 0) {
            let builtSensor = sensor;
            builtSensor.latestReading = reading[0].dataValues;
            sensors.push(builtSensor);
          }
        }
        return sensors;
      })
  };

  const getLatestRemoteData = () => {
    EaSensor.findAll({
      attributes: [
        'notation',
        'lat',
        'long',
        'label',
        'riverName',
        'typicalRangeHigh',
        'typicalRangeLow',
        'scaleMax',
        'status'
      ]
    })  // could improve this to use timestamp and get more than just latest. Use since instead.
      .then(async results => {
        for (let result of results) {
          let sensor = result.dataValues;
          console.log('sensor: ', sensor);
          let id = sensor.notation;
          let url = `${__LATEST_READING__}&stationReference=${id}`;
          let latestMeasureResponse = await rp({
            uri: url,
            json: true
          });

          if (latestMeasureResponse) {
            let measureArray = latestMeasureResponse.items;
            if (measureArray.length > 0) {
              let currentReading = measureArray[0];
              currentReading.urlId = currentReading['@id'];
              currentReading.easensorId = id;
              delete currentReading['@id'];
              console.log('reading: ', currentReading);
              // readings.push(currentReading);
              EaReading.create(currentReading)
                .then(() => {
                  console.log('>>>>>>>> Successfully added new data. <<<<<<<<<<<<');
                })
                .catch(err => {
                  console.log('Prevented insertion of duplicate data.')
                })
            }
          }
        }
      })
  };

  const startDataRequestInterval = () => {
    console.log('Starting schedule');
    cron.schedule('*/15 * * * *', () => { // */15 to poll every 15mins.
      console.log('fetching remote data');
      getLatestRemoteData();
    }, {
      scheduled: true
    });
  };

  return {
    getLatestData,
    startDataRequestInterval
  }
};
