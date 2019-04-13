module.exports.initialiseServerEndpoints = (Server, LocalSensorReading, LocalSensor) => {
  require('./localSensorReadingController')(Server, LocalSensorReading, LocalSensor);
};

module.exports.createLocalSensorReading = (Database, LocalSensor) => {
  return require('./LocalSensorReading')(Database, LocalSensor);
};