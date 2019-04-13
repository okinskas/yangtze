// https://environment.data.gov.uk/flood-monitoring/id/floods?lat=51.2802&long=1.0789&dist=5

const { DataTypes } = require('sequelize');

module.exports = (Database, FloodArea) => {
  let FloodWarning = Database.define('floodwarning', {
    urlId: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING(700),
      allowNull: false
    },
    eaAreaName: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    eaRegionName: {
      type: DataTypes.STRING(150),
      default: null
    },
    isTidal: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING(3000),
    },
    severity: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    severityLevel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    timeMessageChanged: {
      type: DataTypes.DATE,
      allowNull: false
    },
    timeRaised: {
      type: DataTypes.DATE,
      allowNull: false
    },
    timeSeverityChanged: {
      type: DataTypes.DATE,
      allowNull: false
    },
    hasBroadcast: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  });

  FloodArea.hasMany(FloodWarning, {
    sourceKey: 'fwdCode'
  });
  FloodWarning.sync();
  return FloodWarning;
};
