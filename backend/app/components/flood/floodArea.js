// https://environment.data.gov.uk/flood-monitoring/id/floods?lat=51.2802&long=1.0789&dist=5

const { DataTypes } = require('sequelize');

module.exports = (Database) => {
  let FloodArea = Database.define('floodarea', {
    urlId: {
      type: DataTypes.STRING(150),
      unique: true,
      allowNull: false
    },
    county: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(700),
      allowNull: false
    },
    eaAreaName: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    floodWatchArea: {
      type: DataTypes.STRING(150),
      default: null
    },
    fwdCode: {
      type: DataTypes.STRING(40),
      unique: true,
      allowNull: false
    },
    label: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL(10, 7),
      default: 0.0
    },
    long: {
      type: DataTypes.DECIMAL(10, 7),
      default: 0.0
    },
    notation: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    polygon: {
      type: DataTypes.GEOMETRY,
      default: null,
      // allowNull: false
    },
    quickDialNumber: {
      type: DataTypes.STRING(20),
      default: null
    },
    riverOrSea: {
      type: DataTypes.STRING(200),
      default: null
    }
  });

  FloodArea.sync();
  return FloodArea;
};
