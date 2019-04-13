module.exports.createFloodAreaAndWarning = (Database) => {
  let FloodArea = require('./floodArea')(Database);
  let FloodWarning =  require('./floodWarning')(Database, FloodArea);
  return {
    FloodArea,
    FloodWarning
  }
};

module.exports.initialiseServerEndpoints = (Server, FloodArea, FloodWarning) => {
  require('./floodController')(Server, FloodArea, FloodWarning);
};
