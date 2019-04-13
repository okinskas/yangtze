const { DataTypes } = require('sequelize');

module.exports = (Database, LocalSensor) => {
  let LocalSensorReading = Database.define('localsensorreading', {
  //   devId: {
  //     type: DataTypes.STRING(30),
  //     unique: true,
  //     allowNull: false
  //   },
    counter: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // payloadRaw: {
    //   type: DataTypes.DECIMAL(10, 3),
    //   allowNull: false
    // },
    value: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  LocalSensor.hasMany(LocalSensorReading, {
    sourceKey: 'devId'
  });
  console.log('syncing localsensorreading');
  LocalSensorReading.sync();

  return LocalSensorReading;
};
