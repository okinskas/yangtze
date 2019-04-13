module.exports.initialiseServerEndpoints = (Server, EaReading, EaSensor) => {
  // Initialise EaReadingControllerHere.
  require('./eaReadingController')(Server, EaReading, EaSensor);
};

module.exports.createEaReading = (Database, EaSensor) => {
  return require('./EaReading')(Database, EaSensor);
};

