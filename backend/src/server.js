const app = require('./app');
require('dotenv').config();
const findFreePort = require('find-free-port');

const defaultPort = process.env.PORT || 3030;

findFreePort(defaultPort, (err, freePort) => {
  if (err) {
    console.error('Oops! Error finding free port:', err);
    process.exit(1);
  }
  app.listen(freePort, () => {
    console.log(`Mmoney Server running on port => ${freePort} at 12:56 PM SAST, Monday, September 08, 2025`);
  });
});