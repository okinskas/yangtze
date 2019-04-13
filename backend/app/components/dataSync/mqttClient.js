let { data, application } = require('ttn');

const appID = process.env.TTN_ID;
const accessKey = process.env.TTN_KEY;

// discover handler and open mqtt connection
const mqttListener = () => {
  console.log('receiving mqtt');
  data(appID, accessKey)
    .then(function (client) {
      console.log('client received');
      client.on("uplink", function (devID, payload) {
        console.log("Received uplink from ", devID);
        console.log(payload);
      })
    })
    .catch(function (err) {
      console.error(err);
      process.exit(1)
    });
};

module.exports = mqttListener;