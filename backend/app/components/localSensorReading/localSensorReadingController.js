module.exports = (Server, EaReading, EaSensor) => {
  let localSensorReadingFunctions = require('./localSensorReadingFunctions')(EaReading, EaSensor);
  localSensorReadingFunctions.startMqttClient();

  /**
   * Get historical data for a given sensor.
   */
  Server.get('/localsensor/:id', (req, res, next) => {
    let id = req.params.id;
    localSensorReadingFunctions.getLocalReadings(id)
      .then(results => {
        res.json(results);
      })
      .catch(err => {
        console.log(err);
        res.status(400);
        res.json({ message: 'Oops.', reason: err});
      })
      .finally(() => {
        next();
      })
  })
};