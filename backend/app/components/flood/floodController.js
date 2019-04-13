module.exports = (Server, FloodArea, FloodWarning) => {

  const startUp = async () => {
    await floodFunctions.syncFloodAreas();
    await floodFunctions.syncRemoteFloodData();
  };

  const floodFunctions = require('./floodFunctions')(FloodArea, FloodWarning);
  startUp();
  floodFunctions.startDataRequestInterval();

  Server.get('/floodalert', async (req, res, next) => {
    floodFunctions.getLatestFloodData()
      .then(results => {
        res.json(results);
      })
      .catch(err => {
        console.log(err);
        res.status(400);
        res.json({ message: 'Oops', reason: err });
      })
      .finally(() => {
        next();
      })
    });
};
