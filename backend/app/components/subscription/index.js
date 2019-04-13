module.exports.initialiseServerEndpoints = (Server, Subscription, FloodWarning) => {
  require('./subscriptionController')(Server, Subscription, FloodWarning);
};

module.exports.createSubscription = (Database) => {
  return require('./subscription')(Database);
};
