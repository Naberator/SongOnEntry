require('module-alias/register');

const http = require('http'),
      SoeAPI = require('@SoeAPI'),
      SoeServer = http.Server(SoeAPI),
      SoePort = process.env.PORT || 3001,
      LOCAL = '0.0.0.0';

SoeServer.listen(SoePort, LOCAL, () =>
console.log('App running on ${SoePort}'));

