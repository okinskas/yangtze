'use strict';

// Log relevant env variables:
console.log('ENV: EMAIL', process.env.EMAIL);
console.log('ENV: EMAIL_PASSWORD', process.env.EMAIL_PASSWORD);
console.log('ENV: TTN_ID', process.env.TTN_ID);
console.log('ENV: TTN_KEY', process.env.TTN_KEY);
console.log('ENV: DB_HOST', process.env.DB_HOST);
console.log('ENV: DB_PORT', process.env.DB_PORT);
console.log('ENV: DB_NAME', process.env.DB_NAME);
console.log('ENV: DB_USER', process.env.DB_USER);
console.log('ENV: DB_PASSWORD', process.env.DB_PASSWORD);
console.log('ENV: DB_DIALECT', process.env.DB_DIALECT);

const Database = require('./Database');
const Server = require('./server')(Database);

Server.listen(8088, function() {
  console.log('%s listening at %s', Server.name, Server.url);
});
