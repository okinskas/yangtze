module.exports.initialiseServerEndpoints = (Server, EaSensor, EaReading) => {
  // Initialise all EaSensor endpoints.
  require('./eaSensorController')(Server, EaSensor, EaReading);
};

module.exports.createEaSensor = (Database) => {
  return require('./EaSensor')(Database);
};
