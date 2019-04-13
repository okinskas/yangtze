const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const Server = restify.createServer();
const sync = require('./components/dataSync/dataSync');

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*', 'http://localhost:8088'],
  allowHeaders: ["Access-Control-Allow-Origin", "authorization"],
  exposeHeaders: ['*']
});

module.exports = (Database) => {

  // Allows CORS for communication with frontend.
  Server.pre(cors.preflight);
  Server.use(cors.actual);
  Server.use(restify.plugins.bodyParser({ mapParams: true }));

  const { EaSensor, EaReading } = require('./components')(Server, Database);
  sync(EaSensor, EaReading);
  require('./components/dataSync/mqttClient')();

  return Server;
};
