module.exports = (Server, EaReading, EaSensor) => {
  let eaReadingFunctions = require('./eaReadingFunctions')(EaReading, EaSensor);

  /**
   * Get historical data for a given sensor.
   */
  Server.get('/easensor/:id', (req, res, next) => {
    let id = req.params.id;
    eaReadingFunctions.getEaReadings(id)
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
