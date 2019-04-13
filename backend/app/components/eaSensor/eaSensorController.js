module.exports = (Server, EaSensor, EaReading) => {

  const eaSensorFunctions = require('./eaSensorFunctions')(EaSensor, EaReading);
  eaSensorFunctions.startDataRequestInterval();

  /**
   * Get latest sensor data.
   */
  Server.get('/easensor', (req, res, next) => {
    eaSensorFunctions.getLatestData()
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
  });
};
