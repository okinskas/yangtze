module.exports = (Server, LocalSensor, LocalSensorReading) => {

  const localSensorFunctions = require('./localSensorFunctions')(LocalSensor, LocalSensorReading);
  // localSensorFunctions.initialiseSensors();

  Server.get('/localsensor', (req, res, next) => {
    localSensorFunctions.getLatestData()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400);
        res.json({ message: 'Oops', reason: err });
      })
      .finally(() => {
        next();
      });
  })
};