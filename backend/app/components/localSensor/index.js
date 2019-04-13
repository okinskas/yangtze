module.exports.createLocalSensor = (Database) => {
  return require('./LocalSensor')(Database);
};

module.exports.initialiseServerEndpoints = (Server, LocalSensor, LocalSensorReading) => {
  require('./localSensorController')(Server, LocalSensor, LocalSensorReading);
};