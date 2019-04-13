const { DataTypes } = require('sequelize');

module.exports = (Database, EaSensor) => {
  let EaReading = Database.define('eareading', {
    urlId: {
      type: DataTypes.STRING(150),
      unique: true,
      allowNull: false
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    measure: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    value: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false
    }
  });

  EaSensor.hasMany(EaReading, {
    sourceKey: 'notation'
  });
  EaReading.sync();

  return EaReading;
};
