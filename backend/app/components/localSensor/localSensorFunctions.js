module.exports = (LocalSensor, LocalSensorReading) => {

  // Initialise sensors.
  const initialiseSensors = () => {
    let initialDevices = [];

    let lairdc0ee400001012345 = {
      appId: 'kentwatersensors',
      devId: 'lairdc0ee400001012345',
      hardwareSerial: 'C0EE400001012345',
      port: 1,
      latitude: 51.281,
      longitude: 1.0742298,
      altitude: 8,
      locationSource: 'registry',
      units: 'millimeters',
      distanceSensorFromRiverBed: 1.340,
      distanceFloodPlainFromRiverBed: 1.200
    };
    initialDevices.push(lairdc0ee400001012345);

    let lairdc0ee4000010109f3 = {
      appId: 'kentwatersensors',
      devId: 'lairdc0ee4000010109f3',
      hardwareSerial: 'C0EE4000010109F3',
      port: 1,
      latitude: 51.279247,
      longitude: 1.0776373,
      altitude: 9,
      locationSource: 'registry',
      units: 'millimeters',
      distanceSensorFromRiverBed: 1.820,
      distanceFloodPlainFromRiverBed: 1.820
    };
    initialDevices.push(lairdc0ee4000010109f3);

    LocalSensor.bulkCreate(initialDevices);
  };

  const getLatestData = () => {
    return LocalSensor.findAll({
      attributes: [
        'devId',
        'latitude',
        'longitude',
        'altitude',
        'distanceFloodPlainFromRiverBed'
      ]
    }).then(async results => {
      let filteredResults = [];
      for (let result of results) {
        let builtResult = result.dataValues;
        let latestReadings = await LocalSensorReading.findAll({
          limit: 1,
          where: {
            localsensorId: result.devId
          },
          attributes: [
            'counter',
            'value',
            'dateTime'
          ],
          order: [
            ['dateTime', 'DESC']
          ]
        });
        // check for null here.
        if(latestReadings) {
            let cleanLatestReading = latestReadings[0].dataValues;
            builtResult.latestReading = {};
            builtResult.latestReading.counter = cleanLatestReading.counter;
            builtResult.latestReading.value = cleanLatestReading.value;
            builtResult.latestReading.dateTime = cleanLatestReading.dateTime;
            filteredResults.push(builtResult);
        }
      }
      return filteredResults;
    })
    .catch(err => {
      console.log(err);
    })
  };

  return {
    getLatestData,
    initialiseSensors
  }
};

/*
{
  "metadata":[
		{
			"dev_id": "lairdc0ee4000010109e2",
			"units": "millimeters",
			"distance_sensor_from_river_bed": 1440,
			"distance_flood_plain_from_river_bed": 720
		},
		{
			"dev_id": "lairdc0ee4000010109f3",
			"units": "millimeters",
			"distance_sensor_from_river_bed": 1820,
			"distance_flood_plain_from_river_bed": 1820
		},
		{
			"dev_id": "lairdc0ee400001012345",
			"units": "millimeters",
			"distance_sensor_from_river_bed": 1340,
			"distance_flood_plain_from_river_bed": 1200
		}
	]
}
*/
/*
// DEVICE NO LONGER ACTIVE
let lairdc0ee4000010109e2 = {
  appId: 'kentwatersensors',
  devId: 'lairdc0ee4000010109e2',
  hardwareSerial: 'C0EE4000010109E2',
  port: 1,
  latitude: 51.281,
  longitude: 1.0701817,
  altitude: 9,
  locationSource: 'registry',
  units: 'millimeters',
  distanceSensorFromRiverBed: 1440,
  distanceFloodPlainFromRiverBed: 720
};
initialDevices.push(lairdc0ee4000010109e2);
*/