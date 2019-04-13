const eaSensor = require('./eaSensor');
const eaReading = require('./eaReading');
const localSensor = require('./localSensor');
const localSensorReading = require('./localSensorReading');
const subscription = require('./subscription');
const flood = require('./flood');

module.exports = (Server, Database) => {

  const EaSensor = eaSensor.createEaSensor(Database);
  const EaReading = eaReading.createEaReading(Database, EaSensor);
  const LocalSensor = localSensor.createLocalSensor(Database);
  const LocalSensorReading = localSensorReading.createLocalSensorReading(Database, LocalSensor);
  const { FloodArea, FloodWarning } = flood.createFloodAreaAndWarning(Database);
  const Subscription = subscription.createSubscription(Database);

  eaSensor.initialiseServerEndpoints(Server, EaSensor, EaReading);
  eaReading.initialiseServerEndpoints(Server, EaReading, EaSensor);
  localSensor.initialiseServerEndpoints(Server, LocalSensor, LocalSensorReading);
  localSensorReading.initialiseServerEndpoints(Server, LocalSensorReading, LocalSensor);
  flood.initialiseServerEndpoints(Server, FloodArea, FloodWarning);
  subscription.initialiseServerEndpoints(Server, Subscription, FloodWarning);

  return { EaSensor, EaReading, LocalSensor, Subscription, FloodArea, FloodWarning }
};
