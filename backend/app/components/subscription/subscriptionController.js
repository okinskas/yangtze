module.exports = (Server, Subscription, FloodWarning) => {
  let subscriptionFunctions = require('./subscriptionFunctions')(Subscription, FloodWarning);
  subscriptionFunctions.startFloodSubscriptionMonitor();

  /**
   * Subscribe to a given flood area.
   */
  Server.post('/subscribe', (req, res, next) => {
    subscriptionFunctions.subscribe(req.body.email, req.body.floodAreaIDs)
      .then(results => {
        res.json(results);
      })
      .catch(err => {
        console.log(err);
        res.status(400);
        res.json({ message: 'Oops.', reason: err });
      })
      .finally(() => {
        next();
      })
  });

  Server.get('/forcemail', (req, res, next) => {
    subscriptionFunctions.broadcastFloodAlert();
    res.json({ message: 'executed forced emails.' });
    next();
  });
};
