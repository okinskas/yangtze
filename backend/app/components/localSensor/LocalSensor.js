const { DataTypes } = require('sequelize');

module.exports = (Database) => {
  let LocalSensor = Database.define('localsensor', {
    appId: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    devId: {
      type: DataTypes.STRING(150),
      unique: true,
      allowNull: false
    },
    hardwareSerial: {
      type: DataTypes.STRING(150),
      unique: true,
      allowNull: false
    },
    port: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // counter: {                 FOREIGN TABLE
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    // payloadRaw: {                FOREIGN TABLE
    //   type: DataTypes.STRING(150),
    //   unique: true,
    //   allowNull: false
    // },
    latitude: {
      type: DataTypes.STRING(150),
      unique: true,
      allowNull: false
    },
    longitude: {
      type: DataTypes.STRING(150),
      unique: true,
      allowNull: false
    },
    altitude: {
      type: DataTypes.STRING(150),
      unique: true,
      allowNull: false
    },
    locationSource: {
      type: DataTypes.STRING(30),
      allowNull: false,
      default: 'registry'
    },
    units: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    distanceSensorFromRiverBed: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false
    },
    distanceFloodPlainFromRiverBed: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false
    }
  });

  LocalSensor.sync();
  return LocalSensor;
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